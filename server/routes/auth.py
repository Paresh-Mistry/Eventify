from fastapi import APIRouter, HTTPException, Depends, Form, Response, Request
from sqlalchemy.orm import Session
from schemas.auth import UserOut, UserRole, Token
from models.model import User
from database import get_db, engine  
from fastapi import Depends, Cookie
from utils._user_crud import get_user_email, createUser
from core.security import hasHPassword, verifyPassword, accessToken, decodeToken


router = APIRouter()


@router.post("/register/", response_model=UserOut)
def register(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    phone: str = Form(None),
    role: UserRole = Form(UserRole.user),
    db: Session = Depends(get_db)
):
  
    # user = get_user_email(db, email)

    # if user:
    #     raise HTTPException(status_code=401, detail=f"User Already Exists")
    
    new_user = createUser(
        db=db,
        name = name ,
        email = email,
        phone=phone,
        password=hasHPassword(password),
        role=role
    )
  
    return new_user


@router.post('/login', response_model=Token )
def login(response:Response,
        name: str = Form(...),
        email: str = Form(...),
        password: str = Form(...),
        phone: str = Form(None),
        role: UserRole = Form(UserRole.user),
        db: Session = Depends(get_db)
):
    user = get_user_email(db, email)

    if not user or not verifyPassword(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = accessToken({"data":user.email})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=900,  # 15 minutes = 900 seconds
        expires=900,
        samesite="Lax",
        secure=False  # change to True in production (HTTPS)
    )

    return {
        "Accesstoken": token,
        "TokenType":"bearer"
    }



@router.get("/me")
def get_me(request:Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token :
       raise HTTPException(status_code=404 , detail="Invalid Credentials.")
        
    
    payload = decodeToken(token)
    user = get_user_email(db, payload['data'])
    return user

