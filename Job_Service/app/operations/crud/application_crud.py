from app.models.crud_model import BaseCrud
from app.database.models.pg_models.application_model import JobApplications
from app.database.models.pg_models.job_model import Jobs
from app.database.models.pg_models.job_model import Jobs
from sqlalchemy import select
from icecream import ic

class ApplicationCrud(BaseCrud):

    async def create(self, data):
        app = JobApplications(**data)
        self.session.add(app)
        await self.session.commit()
        await self.session.refresh(app)
        return app
    
    async def update_status(self, application_id,status):
        job = await self.get_by_id(application_id)
        email=getattr(job,'email')
        ic(email)
        setattr(job, 'status',status)
        await self.session.commit()

        return {'msg':"Application Status updated successfully",'email':email}
    
    async def get_by_id(self, app_id):
        q = await self.session.execute(
            select(JobApplications).where(JobApplications.id == app_id)
        )
        return q.scalar_one_or_none()
    
    async def get_by_email(self, email):
        q = await self.session.execute(
            select(JobApplications,Jobs.title,Jobs.description,Jobs.location).where(JobApplications.email==email).join(Jobs,Jobs.id==JobApplications.job_id,isouter=True)
        )
        return q.mappings().all()
    
    async def get_by_jobid(self, job_id:str):
        q = await self.session.execute(
            select(JobApplications).where(JobApplications.job_id==job_id)
        )
        return q.scalars().all()

    async def get_all(self):
        q = await self.session.execute(select(JobApplications))
        return q.scalars().all()

    async def update(self, *a, **k):
        raise NotImplementedError()

    async def delete(self, *a, **k):
        raise NotImplementedError()
