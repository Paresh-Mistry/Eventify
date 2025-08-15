from sqlalchemy import Column, Integer, String, Text, Boolean, Date, Time, ForeignKey, Enum, DateTime, Float, func
from sqlalchemy.orm import relationship
from database import Base  # assuming you have a Base from declarative_base()
import enum
from datetime import datetime
import secrets


class UserRole(enum.Enum):
    user = "user"
    organizer = "organizer"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # hashed password
    phone = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.user)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    events = relationship("Event_create", back_populates="organizer") 
    bookings = relationship("Booking", back_populates="user")  
    teams = relationship("Team", back_populates="leader", cascade="all, delete-orphan")


class Event_create(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    email = Column(String, nullable=False, index=True)  # Organizer's contact email
    location = Column(String, nullable=True)
    is_online = Column(Boolean, default=False)
    date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=True)
    price = Column(Float , nullable=True)
    end_time = Column(Time, nullable=True)
    banner_image = Column(String, nullable=True)
    organizer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    # team_id = Column(Integer, ForeignKey("team.id"), nullable=True)


    # Optional relationship to a User model (if you want to link events to organizers)
    organizer = relationship("User", back_populates="events")  # if reverse relation is set
    bookings = relationship("Booking", back_populates="event")
    payments = relationship("Payment", back_populates="event", cascade="all, delete-orphan")
    faqs = relationship("FAQ", back_populates="event", cascade="all, delete-orphan")
    teams = relationship("Team", back_populates="event", cascade="all, delete-orphan")
    created_at = Column(Date, nullable=False)

    def __repr__(self):
        return f"<Event {self.title} on {self.date}>"


class Booking(Base):
    __tablename__ = "booking"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    booking_date = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="confirmed")

    user = relationship("User", back_populates="bookings")
    event = relationship("Event_create", back_populates="bookings")  # <-- FIXED


class FAQ(Base):
    __tablename__ = "faqs"
    
    id = Column(Integer, primary_key=True)
    question = Column(String, nullable=False)
    answer = Column(Text, nullable=True)
    event_id = Column(Integer, ForeignKey("events.id" , ondelete="CASCADE"))

    event = relationship("Event_create", back_populates="faqs")



# ----------------------
# TEAM MODEL (NEW)
# ----------------------
class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    join_code = Column(String, unique=True, index=True, default=lambda: secrets.token_hex(4))
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    leader_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    event = relationship("Event_create", back_populates="teams")
    leader = relationship("User", back_populates="teams")
    members = relationship("TeamMember", back_populates="team", cascade="all, delete-orphan")


# ----------------------
# TEAM MEMBERS (NEW)
# ----------------------
class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    joined_at = Column(DateTime, default=datetime.utcnow)

    team = relationship("Team", back_populates="members")
    user = relationship("User")  # could also add back_populates if needed




class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True)
    price = Column(Float, nullable=False)
    currency = Column(String, default="INR")  # or USD
    mode = Column(String)  # e.g., "online", "on-spot"
    payment_link = Column(String, nullable=True)
    event_id = Column(Integer, ForeignKey("events.id"))

    event = relationship("Event_create", back_populates="payments")

