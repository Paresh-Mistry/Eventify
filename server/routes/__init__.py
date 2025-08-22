from fastapi import APIRouter

from . import auth, event, booking

from database import Base, engine


router = APIRouter()

Base.metadata.create_all(bind=engine)


router.include_router(event.router , tags=["Event"])
router.include_router(booking.router , tags=["Booking"])
router.include_router(auth.router , tags=["User"])