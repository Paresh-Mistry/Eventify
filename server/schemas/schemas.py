from pydantic import BaseModel, EmailStr
from datetime import datetime, date, time
from enum import Enum
from typing import Optional, List


# AUTHENTICATION 

# 1. Enum for User Roles
class UserRole(str, Enum):
    user = "user"
    organizer = "organizer"
    admin = "admin"

# 2. User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: UserRole = UserRole.user

# Schema for creating a new user
class UserCreate(UserBase):
    password: str

# Schema for returning user data (e.g., API response)
class UserOut(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# FAQ's SCHEMAS

class FAQBase(BaseModel):
    question: str
    answer: Optional[str] = None

class FAQCreate(FAQBase):
     faqs: List[FAQBase] = []

class FAQOut(FAQBase):
    id: int

    class Config:
        orm_mode = True 

# EVENTS SCHEMAS

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    email: EmailStr
    location: Optional[str] = None
    is_online: bool = False
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    banner_image: Optional[str] = None
    organizer: Optional[UserBase]
    faqs: Optional[List[FAQBase]] = []

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    organizer_id: Optional[int] = None
    created_at: datetime

    class Config:
        orm_mode = True


# BOOKING SCHEMAS 

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


