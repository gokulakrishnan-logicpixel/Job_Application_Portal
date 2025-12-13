from fastapi import APIRouter,Depends
from app.database.configs.pg_config import get_pg_db_session,AsyncSession
from ..dependencies.token_verification import verify
from ..schemas.admin import AdminAddSchema,AdminUpdateSchema
from app.operation.crud.admin_crud import AdminCrud


router=APIRouter(
    tags=["Admin Crud"],
    prefix="/admin"
)


@router.post('/')
async def add_admin(data:AdminAddSchema,session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await AdminCrud(
        session=session,
        auth_id=auth['id'],
        role=auth['role']
    ).add(
        name=data.name,
        mobile_no=data.mobile_no
    )

@router.put('/')
async def update_admin(data:AdminUpdateSchema,session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await AdminCrud(
        session=session,
        auth_id=auth['id'],
        role=auth['role']
    ).update(
        admin_id=data.admin_id,
        name=data.name,
        mobile_no=data.mobile_no
    )

@router.get('/')
async def get_all_admin(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await AdminCrud(session=session,auth_id=auth['id'],role=auth['role']).get()

@router.get('/id')
async def get_admin_byid(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await AdminCrud(session=session,auth_id=auth['id'],role=auth['role']).get_byid()