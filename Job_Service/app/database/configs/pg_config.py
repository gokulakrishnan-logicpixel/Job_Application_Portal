from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine,async_sessionmaker
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from icecream import ic
import os
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

ENGINE = create_async_engine(DATABASE_URL, echo=True)

async_session = async_sessionmaker(ENGINE)

BASE = declarative_base()

async def get_session():
    async with async_session() as session:
        yield session

async def init_db():
    try:
        ic("Creating a pg tables")
        async with ENGINE.connect() as conn:
            await conn.run_sync(BASE.metadata.create_all)
            await conn.commit()
        ic("Pg tables created successfully")

    except Exception as e:
        ic(f"Error : Creating Pg table {e}")