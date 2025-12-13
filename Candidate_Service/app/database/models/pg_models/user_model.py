from sqlalchemy import Column,String,Date,Enum,ForeignKey
from sqlalchemy.orm import relationship
from app.database.configs.pg_config import BASE
from app.data_types.enums.user_enum import UserDomains

class User(BASE):
    __tablename__="user"
    id=Column(String,primary_key=True)
    name=Column(String,nullable=False)
    description=Column(String,nullable=False)
    dob=Column(Date,nullable=False)
    mobile_no=Column(String,nullable=False)
    experience=Column(String,nullable=False)
    domain=Column(Enum(UserDomains),nullable=False)
    auth_id=Column(String,ForeignKey("authentication.id",ondelete="CASCADE"))

    auth=relationship("Authentication",back_populates="user")