from app.database.models.pg_models.authentication_model import Authentication,AuthRole
from sqlalchemy.ext.asyncio import AsyncSession
from app.operation.models.auth_model import AuthModel
from datetime import date
from sqlalchemy import update,delete,select,or_,and_
from app.security.data_hasher import hash_data,verify_hashed_data
from app.security.token_generation import generate_token,JWT_SECRET,JWT_ALG
from app.utils.uuid_generator import generate_unique_id
from fastapi.exceptions import HTTPException
from icecream import ic
from pydantic import EmailStr


class Auth(AuthModel):
    def __init__(self,session:AsyncSession):
        self.session=session

    async def is_authid_exists(self,auth_id_email:str):
        try:
            auth_user=(await self.session.execute(
                select(
                    Authentication.password,
                    Authentication.id,
                    Authentication.email,
                    Authentication.role
                ).where(
                    or_(
                        Authentication.email==auth_id_email,
                        Authentication.id==auth_id_email
                    )
                )
            )).mappings().one_or_none()

            if auth_user:
                return auth_user
            
            return False
        
        except Exception as e:
            ic(f"Something went wrong while verifying auth id : {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while verifying auth id : {e}"
            )


    async def add(self,email:EmailStr,password:str,role:AuthRole):
        try:
            async with self.session.begin():
                auth_pwd=await self.is_authid_exists(auth_id_email=email)

                if auth_pwd:
                    verify_user=verify_hashed_data(hashed_data=auth_pwd['password'],plain_data=password)

                    if verify_user:
                        return {
                            'token':generate_token(data={'id':auth_pwd['id']},jwt_secret=JWT_SECRET,jwt_alg=JWT_ALG,exp_days=1),
                            'is_new':False
                        }
                    
                    raise HTTPException(
                        status_code=401,
                        detail="Invalid data"
                    )
                
                auth_id=generate_unique_id(email)
                hashed_password=hash_data(password)

                auth_toadd=Authentication(
                    id=auth_id,
                    email=email,
                    password=hashed_password,
                    role=role
                )

                self.session.add(auth_toadd)

                return {
                    'token':generate_token(data={'id':auth_id},jwt_secret=JWT_SECRET,jwt_alg=JWT_ALG,exp_days=1),
                    'is_new':True
                }

            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while creating auth user {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while creating auth user {e}"
            )
        
        
    async def update_password(self,email:EmailStr,password:str):
        try:
            
            async with self.session.begin():
                hashed_pwd=hash_data(password)
                pwd_toupdate=update(
                    Authentication
                ).where(
                    Authentication.email==email
                ).values(
                    password=hashed_pwd
                ).returning(Authentication.id)

                auth_id=(await self.session.execute(pwd_toupdate)).scalar_one_or_none()

                if not auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="User not found"
                    )
                
                return "password changed successfully"
            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while updating password {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while updating password {e}"
            )
        

    
    async def delete(self,auth_id:str):
        try:
            async with self.session.begin():
                auth_todel=delete(
                    Authentication
                ).where(
                    Authentication.id==auth_id
                ).returning(Authentication.id)

                auth_id=(await self.session.execute(auth_todel)).scalar_one_or_none()

                if not auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="user not found"
                    )
                
                return "auth user deleted successfully"
        
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while deleting Auth user {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while deleting Auth user {e}"
            )
    
    async def get(self):
        try:
            auth=(await self.session.execute(
                select(
                    Authentication.id,
                    Authentication.email,
                    Authentication.role
                )
            )).mappings().all()

            return {'auths':auth}
        
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while geting auth {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting auth {e}"
            )
    

    async def get_byid(self,auth_id:str):
        try:
            auth=(await self.session.execute(
                select(
                    Authentication.id,
                    Authentication.email,
                    Authentication.role
                ).where(
                    Authentication.id==auth_id
                )
            )).mappings().one_or_none()

            return {'auth':auth}
        
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while geting auth by id {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting auth by id {e}"
            )
    
                