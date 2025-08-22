
from pydantic import BaseModel
from datetime import datetime
from .auth import UserOut
from typing import List 



# ===============================
# TEAM SCHEMAS 
# ===============================

class TeamMemberOut(BaseModel):
    id: int
    joined_at: datetime
    user: UserOut

    class Config:
        orm_mode = True


class TeamOut(BaseModel):
    id: int
    name: str
    join_code: str
    created_at: datetime
    members: List[TeamMemberOut]

    class Config:
        orm_mode = True


