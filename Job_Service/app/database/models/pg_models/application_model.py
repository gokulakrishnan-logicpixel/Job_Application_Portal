from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from ...configs.pg_config import BASE


class JobApplications(BASE):
    __tablename__ = "job_applications"

    id = Column(String, primary_key=True)
    job_id = Column(String,nullable=False)
    email = Column(String, nullable=False)
    name=Column(String)
    mobile_number=Column(String)
    current_job_title=Column(String)
    linkedin_url=Column(String)
    profile_url=Column(String)
    addtional_info=Column(String)
    status=Column(String,nullable=False)
    resume_url = Column(Text)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())