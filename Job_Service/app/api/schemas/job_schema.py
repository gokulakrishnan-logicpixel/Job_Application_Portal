from pydantic import BaseModel,EmailStr

class JobCreate(BaseModel):
    title: str
    description: str
    location: str

class JobUpdate(BaseModel):
    job_id:str
    title: str | None = None
    description: str | None = None
    location: str | None = None
    is_active: bool | None = None

class JobOut(BaseModel):
    email:EmailStr
    id: str
    title: str
    description: str
    location: str
    is_active: bool

    class Config:
        from_attributes = True
