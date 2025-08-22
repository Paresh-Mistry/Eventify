from fastapi import APIRouter, Depends, Response, Form, status, HTTPException, UploadFile, File
from models.model import Event_create, User, FAQ, Team, TeamMember
from typing import Optional, List
from sqlalchemy.orm import Session , joinedload
from datetime import date, time
from schemas.event import EventOut 
from database import get_db  
import os, secrets

router = APIRouter() 



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
        title=title, description=description,
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
        name=f"{title}",
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

    return new_event



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
        team = Team(name=name, event_id=event_id, leader_id=leader_id, join_code=secrets.token_hex(4))

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

    return {
        "message": "Joined team successfully",
        "team_id": team.id
    }
    

    



@router.get("/event_fetch_data", response_model=List[EventOut], status_code=200)
async def fetch_events(db: Session = Depends(get_db)):
    events_data = db.query(Event_create)\
        .options(joinedload(Event_create.organizer))\
        .all()
    
    if not events_data:
        raise HTTPException(status_code=404, detail="No events found")
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
        event.team = team  # Assuming Event_create has a 'team' relationship

    return event
