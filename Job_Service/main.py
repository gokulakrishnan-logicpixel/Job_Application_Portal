from fastapi import FastAPI
from app.api.routers import job_routes,application_routes
from app.database.configs.pg_config import init_db
from icecream import ic
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

@asynccontextmanager
async def app_lifespan(app:FastAPI):
    try:
        ic("Starting Job application service...")
        await init_db()
        yield

    except Exception as e:
        ic(f"Error : Starting Job application service {e}")

    finally:
        ic("Job application serivce shutingdown...")
        



app=FastAPI(
    title="Job Application Service",
    lifespan=app_lifespan
)


app.include_router(job_routes.router)
app.include_router(application_routes.router)

#Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=["*"],
    allow_credentials=True
)


