from fastapi import APIRouter, Depends, HTTPException
from app.database.configs.pg_config import get_session
from ..schemas.job_schema import JobCreate, JobUpdate, JobOut
from app.operations.crud.job_crud import JobCrud
from app.utils.uuid_generator import create_uuid
from app.middlewares.token_verification import verify_token

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/", response_model=JobOut)
async def create_job(data: JobCreate, session=Depends(get_session)):
    # TEMPORARY BYPASS: Mocking admin user
    token_data = {"role": "admin", "email": "admin@example.com"}

    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    data=data.model_dump().copy()
    data['id']=create_uuid()
    data['email']=token_data['email']
    return await JobCrud(session).create(data)

@router.get("/emails", response_model=list[JobOut])
async def list_jobs(session=Depends(get_session),token_data:dict=Depends(verify_token)):
    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    
    return await JobCrud(session).get_by_email(email=token_data['email'])

@router.get("/")
async def get_jobs(session=Depends(get_session)):
    return await JobCrud(session).get_all()

@router.get("/{job_id}", response_model=JobOut)
async def get_job_byid(job_id: str, session=Depends(get_session),token_data:dict=Depends(verify_token)):

    return await JobCrud(session).get_by_id(job_id)

@router.patch("/")
async def update_job(data: JobUpdate, session=Depends(get_session),token_data:dict=Depends(verify_token)):
    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    return await JobCrud(session).update(job_id=data.job_id,data=data.model_dump(),email=token_data['email'])

@router.delete("/{job_id}")
async def delete_job(job_id: str, session=Depends(get_session),token_data:dict=Depends(verify_token)):
    if token_data['role'].lower()!="admin":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized, Not allowed"
        )
    await JobCrud(session).delete(job_id=job_id,email=token_data['email'])
    return {"message": "Job deleted"}
