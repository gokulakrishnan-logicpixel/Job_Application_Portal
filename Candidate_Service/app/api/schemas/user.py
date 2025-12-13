from pydantic import BaseModel
from app.data_types.enums.user_enum import UserDomains
from datetime import date


class UserAddSchema(BaseModel):
    name:str
    mobile_no:str
    description:str
    experience:str
    domain:UserDomains
    dob:date


class UserUpdateSchema(BaseModel):
    user_id:str
    name:str
    mobile_no:str
    description:str
    experience:str
    domain:UserDomains
    dob:date