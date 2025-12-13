from app.database.models.pg_models.admin_model import Admin
from app.database.models.pg_models.authentication_model import Authentication,AuthRole
from sqlalchemy.ext.asyncio import AsyncSession
from app.operation.models.crud_model import BaseCrud
from datetime import date
from sqlalchemy import update,delete,select,or_,and_
from app.utils.uuid_generator import generate_unique_id
from fastapi.exceptions import HTTPException
from icecream import ic


class AdminCrud(BaseCrud):
    def __init__(self,session:AsyncSession,auth_id:str,role:AuthRole):
        self.session=session
        self.auth_id=auth_id

        if role!=AuthRole.ADMIN:
            raise HTTPException(
                status_code=401,
                detail="Invalid Auth user"
            )

    async def add(self,name:str,mobile_no:str):
        try: 
            async with self.session.begin():
                is_exist=(await self.session.execute(select(Admin.id).where(Admin.auth_id==self.auth_id))).scalar_one_or_none()
                if is_exist:
                    raise HTTPException(
                        status_code=409,
                        detail="Admin already exists"
                    )
                
                admin_id=generate_unique_id(name)
                admin_to_add=Admin(
                    id=admin_id,
                    name=name,
                    mobile_no=mobile_no,
                    auth_id=self.auth_id
                )

                self.session.add(admin_to_add)

                return "Your profile created successfully"
            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while creating admin {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while creating admin {e}"
            )
        
    async def update(self,admin_id:str,name:str,mobile_no:str):
        try:
            
            async with self.session.begin():
                admin_toupdate=update(
                    Admin
                ).where(
                    Admin.id==admin_id
                ).values(
                    name=name,
                    mobile_no=mobile_no
                ).returning(Admin.auth_id)

                admin_authid=(await self.session.execute(admin_toupdate)).scalar_one_or_none()

                if not admin_authid or admin_authid!=self.auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="Admin not found"
                    )
                
                return "Admin profile updated successfully"
            
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while updating admin {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while updating admin {e}"
            )
        

    
    async def delete(self,admin_id:str):
        try:
            async with self.session.begin():
                admin_todel=delete(
                    Admin
                ).where(
                    Admin.id==admin_id
                ).returning(Admin.auth_id)

                admin_authid=(await self.session.execute(admin_todel)).scalar_one_or_none()

                if not admin_authid or admin_authid!=self.auth_id:
                    raise HTTPException(
                        status_code=404,
                        detail="Admin not found"
                    )
                
                return "Admin deleted successfully"
        
        except HTTPException:
            raise

        except Exception as e:
            ic(f"Something went wrong while deleting Admin {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while deleting Admin {e}"
            )
    
    async def get(self):
        try:
            admin_toget=(await 
            self.session.execute(
                select(
                    Admin.id.label("admin_id"),
                    Admin.name,
                    Admin.mobile_no,
                    Authentication.email,
                    Authentication.role
                ).join(
                    Authentication,Authentication.id==Admin.auth_id,
                    isouter=True
                )
            )
            ).mappings().all()

            return {'admins':admin_toget}
    
        except HTTPException:
                raise

        except Exception as e:
            ic(f"Something went wrong while geting admin {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting admin {e}"
            )


    async def get_byid(self):
        try:
            
            admin_toget=(await 
            self.session.execute(
                select(
                    Admin.id.label("admin_id"),
                    Admin.name,
                    Admin.mobile_no,
                    Authentication.email,
                    Authentication.role
                ).join(
                    Authentication,Authentication.id==Admin.auth_id,
                    isouter=True
                ).where(
                    Admin.auth_id==self.auth_id
                )
            )
            ).mappings().one_or_none()

            return {'admin':admin_toget}
    
        except HTTPException:
                raise

        except Exception as e:
            ic(f"Something went wrong while geting admin {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Something went wrong while geting admin {e}"
            )



                