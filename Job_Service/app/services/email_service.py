from dotenv import load_dotenv
import os
from pydantic import EmailStr
from typing import List
import httpx
from icecream import ic
load_dotenv()

NOTIFI_SERVICE_URL=os.getenv("NOTIFICATION_SERVICE_URL")


async def send_email(recivers_email:List[EmailStr],subject:str,body:str,is_html:bool):
    try:
        async with httpx.AsyncClient(timeout=90) as http:
            res=await http.post(
                url=f"{NOTIFI_SERVICE_URL}/services/email/send",
                json={
                    'recivers_email':recivers_email,
                    'subject':subject,
                    'body':body,
                    'is_html':is_html
                }
            )

            if res!=200:
                ic("Error sending email : ",res.status_code,res.text)
            

            ic("Email sended successfully")


    except Exception as e:
        ic(f"Error sending email : ",e)