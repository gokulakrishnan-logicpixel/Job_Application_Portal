from app.database.configs.pg_config import BASE
from sqlalchemy import Column,String,Enum
from sqlalchemy.orm import relationship
from app.data_types.enums.auth_enum import AuthRole


class Authentication(BASE):
    __tablename__="authentication"
    id=Column(String,primary_key=True)
    email=Column(String,nullable=False)
    password=Column(String,nullable=False)
    role=Column(Enum(AuthRole),nullable=False)

    user=relationship("User",back_populates="auth",cascade="all, delete-orphan")
    admin=relationship("Admin",back_populates="auth",cascade="all, delete-orphan")