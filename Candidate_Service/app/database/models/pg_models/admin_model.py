from sqlalchemy import Column,String,Enum,ForeignKey
from app.database.configs.pg_config import BASE
from sqlalchemy.orm import relationship

class Admin(BASE):
    __tablename__="admin"
    id=Column(String,primary_key=True)
    name=Column(String,nullable=False)
    mobile_no=Column(String,nullable=False)
    auth_id=Column(String,ForeignKey("authentication.id",ondelete="CASCADE"))

    auth=relationship("Authentication",back_populates="admin")
    

