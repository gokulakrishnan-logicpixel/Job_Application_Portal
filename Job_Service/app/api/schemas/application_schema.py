from pydantic import BaseModel, EmailStr
from app.datatypes.enums.application_enums import ApplicationStatusEnum
from typing import Optional

class ApplyJob(BaseModel):
    name:str
    linkedin_url:str | None=None
    addtional_info:str
    current_job_title:str
    mobile_number:str
    profile_url: str | None = None
    job_id:str

class UpdateStatusJob(BaseModel):
    name:str
    linkedin_url:str
    addtional_info:str
    current_job_title:str
    mobile_number:str
    profile_url: str | None = None
    application_id:str

class ApplicationOut(BaseModel):
    id: str
    name:str
    linkedin_url:str
    addtional_info:str
    current_job_title:str
    mobile_number:str
    profile_url: str | None = None
    job_id:str
