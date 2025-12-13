from jwt import PyJWT
from jwt.exceptions import PyJWTError,DecodeError,ExpiredSignatureError
import os
from dotenv import load_dotenv
load_dotenv()

JWT_SECRET=os.getenv("JWT_SECRET")
JWT_ALG=os.getenv("JWT_ALG")

jwt_token=PyJWT()

