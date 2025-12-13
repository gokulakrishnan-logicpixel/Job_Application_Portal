from ..templates.emails.application_email import get_appication_applied_email_content,get_application_status_email_content
from ..services.email_service import send_email
from typing import List
from pydantic import EmailStr
from dotenv import load_dotenv
import os
load_dotenv()

FRONTEND_URL=os.getenv("FRONTEND_URL")

async def send_application_applied_email(recivers_email:List[EmailStr],job_name:str,role:str,candidate_name:str):
    email_content=get_appication_applied_email_content(
        candidate_name=candidate_name,
        website_link=FRONTEND_URL,
        job_name=job_name,
        job_role=role
    )

    await send_email(
        recivers_email=recivers_email,
        subject="Application Recived Successfully",
        body=email_content,
        is_html=True
    )

async def send_application_status_email(recivers_email:List[EmailStr],application_sts:str,role:str,candidate_name:str):
    email_content=get_application_status_email_content(
        candidate_name=candidate_name,
        status=application_sts,
        job_role=role,
        website_link=FRONTEND_URL
    )
    await send_email(
        recivers_email=recivers_email,
        subject="Your application status changed",
        body=email_content,
        is_html=True
    )