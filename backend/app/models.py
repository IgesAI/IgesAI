from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class WaitlistEntry(BaseModel):
    email: EmailStr
    timestamp: datetime = datetime.now()
    confirmed: bool = False

class WaitlistResponse(BaseModel):
    message: str
