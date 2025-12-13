from fastapi import APIRouter, Depends, HTTPException,BackgroundTasks
from app.database.configs.pg_config import get_session
from ..schemas.application_schema import ApplyJob, ApplicationOut,UpdateStatusJob
from app.operations.crud.application_crud import ApplicationCrud
from app.utils.uuid_generator import create_uuid
from app.datatypes.enums.application_enums import ApplicationStatusEnum
from icecream import ic
from pydantic import EmailStr
from app.middlewares.token_verification import verify_token
from app.utils.email_senders import send_application_applied_email,send_application_status_email


router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/apply", response_model=ApplicationOut)
async def apply_job(data: ApplyJob,bgt:BackgroundTasks, session=Depends(get_session),token_data:dict=Depends(verify_token)):
    data=data.model_dump().copy()
    data['id']=create_uuid()
    data['status']=ApplicationStatusEnum.WAITING.value
    data['email']=token_data['email']
    ic(data)
    res=await ApplicationCrud(session).create(data)
    bgt.add_task(
        send_application_applied_email,
        recivers_email=[token_data['email']],
        job_name="Applied Job Name",
        role="Software Developer",
        candidate_name="Thamodharan"
    )

    return res

@router.get('/emails')
async def get_by_email(session=Depends(get_session),token_data:dict=Depends(verify_token)):
    ic(token_data['email'])
    return await ApplicationCrud(session).get_by_email(email=token_data['email'])


@router.get('/jobs/{job_id}',response_model=list[ApplicationOut])
async def get_by_email(job_id:str,session=Depends(get_session),token_data:dict=Depends(verify_token)):
    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    
    return await ApplicationCrud(session).get_by_jobid(job_id=job_id)


@router.patch('/job/status')
async def update_job_sts(data:UpdateStatusJob,bgt:BackgroundTasks,session=Depends(get_session),token_data:dict=Depends(verify_token)):
    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    
    res=await ApplicationCrud(session=session).update_status(application_id=data.application_id,status=data.status.value)

    bgt.add_task(
        send_application_status_email,
        recivers_email=[res['email']],
        application_sts=data.status.value,
        role="Software Developer",
        candidate_name="Thamodharan"
    )
    return res['msg']


