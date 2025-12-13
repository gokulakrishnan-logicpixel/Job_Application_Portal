from jwt import PyJWT,ExpiredSignatureError,InvalidSignatureError
from dotenv import load_dotenv
import os
load_dotenv()

pyjwt_token=PyJWT()

JWT_SECRET=os.getenv("JWT_SECRET")
JWT_ALG=os.getenv("JWT_ALG")