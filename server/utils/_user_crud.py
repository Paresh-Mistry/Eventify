from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from database import get_db
from enum import Enum
from pydantic import EmailStr
from models.model import User

def get_user_email(email:str, db:Session = Depends(get_db)) -> User|None:
   
   user = db.query(User).filter(User.email == email).first()

   try:
     user = user
     print({"user":user})
    #  if user:
    #    print("Finding user in db")
    #    raise HTTPException(status_code=409, detail=f"User Already Exists, Error - {str(e)} , {user.email}")
     print("Working...")
     return user
   except Exception as e:
     raise HTTPException(status_code=404 , detail=f"No User Found, Error - {str(e)}, {user.name}")
   

def createUser(db:Session, email:EmailStr, name:str, password:str, phone:int, role:Enum):
   
   try:
    new_user = User(
      name=name,
      email=email,
      password=password,
      phone=phone,
      role=role
      )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)   

    return new_user
   
   except Exception as e:
    db.rollback()
    raise HTTPException(status_code=401 , detail=f"No data commited, Error - {str(e)}")

