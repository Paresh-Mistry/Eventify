from fastapi import FastAPI, APIRouter , HTTPException, Response, Form, Depends
from sqlalchemy.orm import Session, joinedload
from models.model import Booking, User, TeamMember
from schemas.booking import BookingOut, BookingCreate
from database import get_db
from sqlalchemy import func
from typing import List 


router = APIRouter() 



@router.post("/booking", response_model=BookingOut )
def create_booking(booking: BookingCreate, db: Session = Depends(get_db), user: User = Depends(get_db)):
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



@router.get("/event-booking-count" )
def event_booking_count(db: Session = Depends(get_db)):
    data = db.query(
        Booking.event_id,
        func.count(Booking.id).label("count")
    ).group_by(Booking.event_id).all()
    return [{"event_id": event_id, "booking_count": count} for event_id, count in data]



@router.get("/history/{userId}", response_model=List[BookingOut] )
def user_history(userId: int, db: Session = Depends(get_db)):
    history = db.query(Booking)\
        .options(joinedload(Booking.event))\
        .filter(Booking.user_id == userId)\
        .all()

    if not history:
        raise HTTPException(status_code=404, detail="No bookings found for this user")

    return history