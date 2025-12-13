from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession 
from sqlalchemy.ext.declarative import declarative_base
import os
from icecream import ic
from dotenv import load_dotenv
load_dotenv()


PG_DATABASE_URL=os.getenv("PG_DATABASE_URL")

ENGINE=create_async_engine(url=PG_DATABASE_URL)

BASE=declarative_base()


LocalSession=async_sessionmaker(ENGINE)

async def init_pg_db():
    try:
        ic("Initializing Pg db...📊")
        async with ENGINE.begin() as conn:
            await conn.run_sync(BASE.metadata.create_all)

        ic("✅ Pg Database initialized successfully")
    
    except Exception as e:
        ic(f"❌ Error : initializing Pg Database {e}")

async def get_pg_db_session():
    Session=LocalSession()
    try:
        yield Session
    finally:
        await Session.close()


