from fastapi import FastAPI
from app.api.routers import email_routes



app=FastAPI(
    title="Notification Service"
)


app.include_router(email_routes.router,prefix="/services")