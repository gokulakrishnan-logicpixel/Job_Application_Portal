import os,time
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from typing import List
from pydantic import EmailStr


load_dotenv()

SMTP_HOST = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


class EmailService:
    @staticmethod
    async def send(
        receivers: List[EmailStr],
        subject: str,
        body: str,
        is_html: bool = True,
    ):
        """
        Sends an email using aiosmtplib asynchronously.
        """
        st=time.time()
        print(SMTP_EMAIL,SMTP_HOST,SMTP_PASSWORD,SMTP_HOST)
        # Build message
        msg = MIMEMultipart("alternative")
        msg["From"] = SMTP_EMAIL
        msg["To"] = ", ".join(receivers)
        msg["Subject"] = subject

        if is_html:
            msg.attach(MIMEText(body, "html"))
        else:
            msg.attach(MIMEText(body, "plain"))

        try:
            # SMTP Connection
            if SMTP_PORT==465:
                smtp = aiosmtplib.SMTP(
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    use_tls=True
                )
            else:
                smtp = aiosmtplib.SMTP(
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    start_tls=True
                )
            async with smtp:
                await smtp.login(SMTP_EMAIL, SMTP_PASSWORD)
                await smtp.send_message(msg)

            print("Email sended at :",time.time()-st)
            print({"status": "success", "message": "Email sent successfully"})

        except Exception as e:
            print("Email sending failed:", e)
            return {"status": "error", "message": str(e)}
