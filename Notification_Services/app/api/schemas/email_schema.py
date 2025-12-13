from pydantic import BaseModel,EmailStr
from typing import List

class SendEmailSchema(BaseModel):
    recivers_email:List[EmailStr]
    subject:str
    body:str
    is_html:bool