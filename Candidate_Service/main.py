from fastapi import FastAPI
from app.api.routes import admin,auth,user
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.database.configs.pg_config import init_pg_db,ic,os,load_dotenv
load_dotenv()


@asynccontextmanager
async def candidate_service_lifespan(app:FastAPI):
    try:
        ic("🚀 Starting candidate service")
        await init_pg_db()
        yield

    except Exception as e:
        ic(f"Error ❌: Starting Candidate service lifespan")
    
    finally:
        ic("👋 Finishing Candidate Service")


ENVIRONMENT=os.getenv("ENVIRONMENT",'production').lower()
openapi_url='/openapi.json'
docs='/docs'
redoc='/redoc'
debug=True

if ENVIRONMENT=="production":
    openapi_url=None
    docs=None
    redoc=None
    debug=False

app=FastAPI(lifespan=candidate_service_lifespan,openapi_url=openapi_url,docs_url=docs,redoc_url=redoc,debug=debug,title="Candidate Service")


# Routes
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(user.router)


#Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=["*"],
    allow_credentials=True
)