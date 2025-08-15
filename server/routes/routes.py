from fastapi import APIRouter, HTTPException, Depends, Form, File, UploadFile, Response
from sqlalchemy.orm import Session , joinedload
from sqlalchemy import func
from typing import Optional
from schemas.schemas import EventOut, UserOut, UserRole, BookingCreate, BookingOut, TeamOut
from models.model import Base, Event_create, User, Booking, FAQ, Team, TeamMember
from datetime import date, time
from typing import List
from utils.access_token import create_access_token , SECRET_KEY, ALGORITHM
from database import get_db, engine  
from fastapi import Depends, Cookie
from jose import jwt, JWTError
from passlib.hash import bcrypt
import os, secrets

Base.metadata.create_all(bind=engine)

router = APIRouter()


def generate_join_code(length=6):
    import random, string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

@router.post("/users/", response_model=UserOut)
def create_user(
    response : Response,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    phone: str = Form(None),
    role: UserRole = Form(UserRole.user),
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before saving
    hashed_password = bcrypt.hash(password)

    # Create user instance
    new_user = User(
        name=name,
        email=email,
        password=hashed_password,
        phone=phone,
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=900,  # 15 minutes = 900 seconds
        expires=900,
        samesite="Lax",
        secure=False  # change to True in production (HTTPS)
    )

    return new_user


def get_current_user_from_cookie(access_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Token missing in cookie")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    

@router.post("/create")
def create_team(
    name: str = Form(...),
    event_id: int = Form(...),
    leader_id: int = Form(...),
    db: Session = Depends(get_db)
    ):
    try:
    # Check event exists
        event = db.query(Event_create).filter(Event_create.id == event_id).first()
        print(event)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Create team
        team = Team(
            name=name,
            event_id=event_id,
            leader_id=leader_id,
            join_code=secrets.token_hex(4)  
        )
        print(team)
        db.add(team)
        db.commit()
        db.refresh(team)

        # Add leader as first member
        leader_member = TeamMember(team_id=team.id, user_id=leader_id)
        db.add(leader_member)
        db.commit()

        return {
            "message": "Team created successfully",
            "team_id": team.id,
            "join_code": team.join_code
        }
    except Exception as e:
        print("Error while post...")
        raise HTTPException(status_code=404 , detail="{}".format(str(e)))


# Join a team via code
@router.post("/join")
def join_team(user_id: int, join_code: str, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.join_code == join_code).first()
    if not team:
        raise HTTPException(status_code=404, detail="Invalid join code")

    # Prevent duplicate joining
    already_member = db.query(TeamMember).filter(
        TeamMember.team_id == team.id,
        TeamMember.user_id == user_id
    ).first()
    if already_member:
        raise HTTPException(status_code=400, detail="Already in the team")

    # Add member
    member = TeamMember(team_id=team.id, user_id=user_id)
    db.add(member)
    db.commit()

    return {"message": "Joined team successfully", "team_id": team.id}
    

@router.get("/me")
def get_me(user: User = Depends(get_current_user_from_cookie)):
    return user


@router.post("/events/", response_model=EventOut)
async def create_event_form(
    title: str = Form(...),
    description: str = Form(...),
    email: str = Form(...),
    location: str = Form(...),
    is_online: bool = Form(...),
    date: date = Form(...),
    start_time: time = Form(...),
    end_time: time = Form(...),
    banner_image: Optional[UploadFile] = File(None),
    faq_questions: List[str] = Form(default=[]),
    faq_answers: List[str] = Form(default=[]),
    price: float = Form(...),
    db: Session = Depends(get_db)
):
    # 1. Check if organizer exists
    organizer = db.query(User).filter(User.email == email).first()
    if not organizer:
        raise HTTPException(status_code=404, detail="Organizer not found")

    # 2. Handle banner image upload
    banner_filename = None
    if banner_image:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        banner_filename = os.path.join(upload_dir, banner_image.filename)
        with open(banner_filename, "wb") as f:
            f.write(await banner_image.read())

    # 3. Create the event
    new_event = Event_create(
        title=title,
        description=description,
        email=email,
        location=location,
        is_online=is_online,
        date=date,
        start_time=start_time,
        end_time=end_time,
        banner_image=banner_filename,
        organizer_id=organizer.id,
        price= price,
        created_at=date
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)


    default_team = Team(
        name=f"{title} Team",
        event_id=new_event.id,
        leader_id=organizer.id
    )
    db.add(default_team)
    db.commit()
    db.refresh(default_team)

    for question, answer in zip(faq_questions, faq_answers):
        if question.strip():  # skip empty
            faq = FAQ(
                question=question.strip(),
                answer=answer.strip(),
                event_id=new_event.id
            )
            db.add(faq)

    db.commit()
    db.refresh(new_event)

    return {
        "team_id":default_team.id
    }
    

@router.get("/event_fetch_data", response_model=List[EventOut], status_code=200)
async def fetch_events(db: Session = Depends(get_db)):
    events_data = db.query(Event_create)\
        .options(joinedload(Event_create.organizer))\
        .all()
    
    if not events_data:
        raise HTTPException(status_code=404,    detail="No events found")
    return events_data



@router.get("/events/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)):
    # Get event
    event = db.query(Event_create).filter(Event_create.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Get team linked to event
    team = db.query(Team).filter(Team.event_id == event_id).first()

    # Attach team data to event object (if your EventOut schema supports it)
    if team:
        event.team = team # Assuming Event_create has a 'team' relationship

    return event



@router.post("/booking", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user_from_cookie)):
    # If team_id is provided, validate membership
    if hasattr(booking, "team_id") and booking.team_id:
        membership = db.query(TeamMember).filter(
            TeamMember.team_id == booking.team_id,
            TeamMember.user_id == user.id
        ).first()
        if not membership:
            raise HTTPException(status_code=403, detail="You are not a member of this team")

    new_booking = Booking(**booking.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking



@router.get("/event-booking-count")
def event_booking_count(db: Session = Depends(get_db)):
    data = db.query(
        Booking.event_id,
        func.count(Booking.id).label("count")
    ).group_by(Booking.event_id).all()
    return [{"event_id": event_id, "booking_count": count} for event_id, count in data]



@router.get("/history/{userId}", response_model=List[BookingOut])
def user_history(userId: int, db: Session = Depends(get_db)):
    history = db.query(Booking)\
        .options(joinedload(Booking.event))\
        .filter(Booking.user_id == userId)\
        .all()

    if not history:
        raise HTTPException(status_code=404, detail="No bookings found for this user")

    return history