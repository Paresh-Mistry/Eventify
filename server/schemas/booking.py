from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .event import EventBase



# ========================
# BOOKING SCHEMAS 
# ========================

class BookingBase(BaseModel):
    user_id: int
    event_id: int
    status: str = "confirmed"


class BookingCreate(BookingBase):
    pass


class BookingOut(BookingBase):
    id: int
    booking_date: datetime
    event: Optional[EventBase]

    class Config:
        orm_mode = True        

