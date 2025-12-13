from fastapi import APIRouter,Depends
from app.database.configs.pg_config import get_pg_db_session,AsyncSession
from ..dependencies.token_verification import verify
from ..schemas.user import UserAddSchema,UserUpdateSchema
from app.operation.crud.user_crud import UserCrud,UserDomains


router=APIRouter(
    tags=["User Crud"],
    prefix="/user"
)


@router.post('/')
async def add_user(data:UserAddSchema,session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await UserCrud(session=session,auth_id=auth['id'],role=auth['role']).add(
        name=data.name,
        description=data.description,
        mobile_no=data.mobile_no,
        dob=data.dob,
        experience=data.experience,
        domain=data.domain
    )

@router.put('/')
async def update_user(data:UserUpdateSchema,session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await UserCrud(
        session=session,
        auth_id=auth['id'],
        role=auth['role']
    ).update(
        user_id=data.user_id,
        name=data.name,
        description=data.description,
        mobile_no=data.mobile_no,
        dob=data.dob,
        experience=data.experience,
        domain=data.domain
    )

@router.get('/')
async def get_all_user(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await UserCrud(session=session,auth_id=auth['id'],role=auth['role']).get()

@router.get('/id')
async def get_user_byid(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await UserCrud(session=session,auth_id=auth['id'],role=auth['role']).get_byid()