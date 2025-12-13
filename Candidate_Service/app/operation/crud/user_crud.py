from app.database.models.pg_models.user_model import User,UserDomains
from app.database.models.pg_models.authentication_model import Authentication,AuthRole
from sqlalchemy.ext.asyncio import AsyncSession
from app.operation.models.crud_model import BaseCrud
from datetime import date
from sqlalchemy import update,delete,select,or_,and_
from app.utils.uuid_generator import generate_unique_id
from fastapi.exceptions import HTTPException
from icecream import ic


class UserCrud(BaseCrud):
    def __init__(self,session:AsyncSession,auth_id:str,role:AuthRole):
        self.session=session
        self.auth_id=auth_id

        if role!=AuthRole.USER:
            raise HTTPException(
                status_code=401,
                detail="invalid Auth user"
            )

    async def add(self,name:str,description:str,mobile_no:str,dob:date,experience:str,domain:UserDomains):
        try:
            async with self.session.begin():
                is_exist=(await self.session.execute(select(User.id).where(User.auth_id==self.auth_id))).scalar_one_or_none()
                if is_exist:
                    raise HTTPException(
                        status_code=409,
                        detail="User already exists"
                    )
                
                user_id=generate_unique_id(name)
                user_to_add=User(
                    id=user_id,
                    name=name,
                    description=description,
                    mobile_no=mobile_no,
                    dob=dob,
                    experience=experience,
                    domain=domain,
                    auth_id=self.auth_id
                )

                self.session.add(user_to_add)

                return "Your profile created successfully"
            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while creating User {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while creating User {e}"
            )
        
    async def update(self,user_id:str,name:str,description:str,mobile_no:str,dob:date,experience:str,domain:UserDomains):
        try:
            
            async with self.session.begin():
                user_toupdate=update(
                    User
                ).where(
                    User.id==user_id
                ).values(
                    name=name,
                    description=description,
                    dob=dob,
                    experience=experience,
                    domain=domain,
                    mobile_no=mobile_no
                ).returning(User.auth_id)

                user_authid=(await self.session.execute(user_toupdate)).scalar_one_or_none()

                if not user_authid or user_authid!=self.auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="User not found"
                    )
                
                return "User profile updated successfully"
            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while updating User {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while updating User {e}"
            )
        

    async def delete(self,user_id:str):
        try:
            async with self.session.begin():
                user_todel=delete(
                    User
                ).where(
                    User.id==user_id
                ).returning(User.auth_id)

                user_authid=(await self.session.execute(user_todel)).scalar_one_or_none()

                if not user_authid or user_authid!=self.auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="User not found"
                    )
                
                return "User deleted successfully"
        
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while deleting User {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while deleting User {e}"
            )
    
    async def get(self):
        try:
            user_toget=(await self.session.execute(select(
                User.id.label("user_id"),
                User.name,
                User.mobile_no,
                User.description,
                User.domain,
                User.experience,
                User.auth_id,
                Authentication.email
            ).join(
                Authentication,Authentication.id==User.auth_id,
                isouter=True
            ))).mappings().all()

            return {'users':user_toget}
    
        except HTTPException:
                raise

        except Exception as e:
            ic(f"Something went wrong while geting User {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting User {e}"
            )


    async def get_byid(self): 
        try:
            user_toget=(await self.session.execute(
                select(
                    User.id.label("user_id"),
                    User.name,
                    User.mobile_no,
                    User.description,
                    User.domain,
                    User.experience,
                    User.auth_id,
                    User.dob,
                    Authentication.email
                ).join(
                    Authentication,Authentication.id==User.auth_id,
                    isouter=True,
                    full=True
                ).where(
                    User.auth_id==self.auth_id
                )
            )
            ).mappings().one_or_none()

            return {'user':user_toget}
    
        except HTTPException:
                raise

        except Exception as e:
            ic(f"Something went wrong while geting User by id {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting User by id {e}"
            )



                