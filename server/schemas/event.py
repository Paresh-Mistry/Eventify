from pydantic import BaseModel, EmailStr
from datetime import datetime, date, time
from typing import Optional, List
from .team import TeamOut
from .auth import UserOut




# =================
# FAQ's SCHEMAS
# =================

class FAQBase(BaseModel):
    question: str
    answer: Optional[str] = None


class FAQCreate(FAQBase):
     faqs: List[FAQBase] = []


class FAQOut(FAQBase):
    id: int

    class Config:
        orm_mode = True 



# =================
# EVENTS SCHEMAS
# =================

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    email: Optional[EmailStr] = None  # Make optional if not always provided
    location: Optional[str] = None
    is_online: bool = False
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    banner_image: Optional[str] = None

    organizer: Optional[UserOut] = None  # Use UserOut so IDs, names, etc. are serialized
    faqs: List[FAQOut] = []              # Default to empty list for responses
    price: Optional[float] = None
    team: Optional[TeamOut] = None       # Nested team info

    class Config:
        orm_mode = True


class EventCreate(EventBase):
    pass


class EventOut(EventBase):
    id: int
    organizer_id: Optional[int] = None
    created_at: datetime

    class Config:
        orm_mode = True







