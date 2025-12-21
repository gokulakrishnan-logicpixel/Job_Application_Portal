import asyncio
from sqlalchemy import Column, Integer, String, select
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    title = Column(String)

async def test():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with async_session() as session:
        job = Job(id=1, title="Test Job")
        session.add(job)
        await session.commit()

        # Test logic from JobCrud.get_all
        q = await session.execute(select(Job))
        mappings = q.mappings().all()
        print(f"Mappings: {mappings}")
        print(f"First item keys: {mappings[0].keys()}")
        
        # Check if it looks like what Pydantic expects (flat dict)
        # Expected: {'id': 1, 'title': 'Test Job'}
        # Suspected: {'Job': <Job object>}
        
        # Test logic from JobCrud.get_by_email (correct one)
        q2 = await session.execute(select(Job))
        scalars = q2.scalars().all()
        print(f"Scalars: {scalars}")

if __name__ == "__main__":
    try:
        asyncio.run(test())
    except Exception as e:
        print(e)
