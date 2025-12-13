from fastapi import APIRouter,BackgroundTasks
from ..schemas.email_schema import SendEmailSchema
from app.services.email_service import EmailService
from fastapi.responses import ORJSONResponse


router=APIRouter(
    tags=["Email Service"],
    prefix="/email"
)


@router.post("/send")
async def send_email(data:SendEmailSchema,bgt:BackgroundTasks):
    bgt.add_task(
        EmailService.send,
        receivers=data.recivers_email,
        subject=data.subject,
        body=data.body,
        is_html=data.is_html
    )

    return ORJSONResponse(
        status_code=200,
        content="Your's email will be sended soon..."
    )