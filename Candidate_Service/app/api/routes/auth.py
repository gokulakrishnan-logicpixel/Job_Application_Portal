from fastapi import APIRouter,Depends
from app.database.configs.pg_config import get_pg_db_session,AsyncSession
from ..dependencies.token_verification import verify
from ..schemas.auth import AuthSchema
from app.operation.Auth.authentication import Auth,AuthRole


router=APIRouter(
    tags=["Auth Crud"],
    prefix="/auth"
)


@router.post('/')
async def add_update_auth(data:AuthSchema,session:AsyncSession=Depends(get_pg_db_session)):
    name,provider=data.email.split('@')
    role=AuthRole.USER
    if provider.lower()=="hcl.in":
        role=AuthRole.ADMIN

    return await Auth(session=session).add(email=data.email,password=data.password,role=role)

@router.delete('/')
async def delete_auth(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await Auth(session=session).delete(auth_id=auth['id'])

@router.get('/')
async def get_all_auths(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await Auth(session=session).get()

@router.get('/id')
async def get_student_by_id(session:AsyncSession=Depends(get_pg_db_session),auth:dict=Depends(verify)):
    return await Auth(session=session).get_byid(auth_id=auth['id'])
