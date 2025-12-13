from app.models.crud_model import BaseCrud
from app.database.models.pg_models.job_model import Jobs
from app.database.models.pg_models.application_model import JobApplications
from app.datatypes.enums.application_enums import ApplicationStatusEnum
from sqlalchemy import select,update

class JobCrud(BaseCrud):

    async def create(self, data):
        job = Jobs(**data)
        self.session.add(job)
        await self.session.commit()
        await self.session.refresh(job)
        return job

    async def update(self, job_id, data,email):
        job = await self.get_by_id(job_id,email)
        for key, value in data.items():
            setattr(job, key, value)
        await self.session.commit()
        return "Job updated successfully"

    async def delete(self, job_id,email):
        job = await self.get_by_id(job_id,email)
        await self.session.delete(job)
        await self.session.execute(update(JobApplications).where(JobApplications.job_id==job_id).values(status=ApplicationStatusEnum.DISCLOSED.value))
        await self.session.commit()

    async def get_by_id(self, job_id):
        q = await self.session.execute(select(Jobs).where(Jobs.id == job_id))
        return q.scalar_one_or_none()
    

    async def get_by_email(self,email:str):
        q = await self.session.execute(select(Jobs).where(Jobs.email==email))
        return q.scalars().all()
    

    async def get_all(self):
        q = await self.session.execute(select(Jobs))
        return q.mappings().all()
