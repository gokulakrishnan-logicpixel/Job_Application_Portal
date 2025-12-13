from sqlalchemy import Column, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from ...configs.pg_config import BASE

class Jobs(BASE):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True)
    email=Column(String,nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
