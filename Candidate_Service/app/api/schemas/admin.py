from pydantic import BaseModel, EmailStr


class AdminAddSchema(BaseModel):
    name:str
    mobile_no:str

class AdminUpdateSchema(BaseModel):
    admin_id:str
    name:str
    mobile_no:str
