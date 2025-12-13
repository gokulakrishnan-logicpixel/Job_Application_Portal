from fastapi import Request,HTTPException,Depends
from fastapi.security.http import HTTPAuthorizationCredentials,HTTPBearer
from app.configs.token_config import pyjwt_token,JWT_ALG,JWT_SECRET,ExpiredSignatureError,InvalidSignatureError
import httpx
from icecream import ic
from dotenv import load_dotenv
import os
load_dotenv()


bearer=HTTPBearer()
AUTH_API_URL=os.getenv("AUTHENTICATION_API_URL")

async def verify_token(request:Request,creditionals:HTTPAuthorizationCredentials=Depends(bearer)):
    try:
        token=creditionals.credentials
        ic(token)
        if not token:
            raise HTTPException(
                status_code=401,
                detail="Unauthorized, Try to login again"
            )
        
        try:
            async with httpx.AsyncClient(timeout=90) as http:
                headers={'Authorization':f"Bearer {token}"}
                res=await http.get(f"{AUTH_API_URL}/auth/id",headers=headers)

            ic(res,res.text)
            if res.status_code!=200 or not res.json().get('auth',None):
                raise HTTPException(
                    status_code=401,
                    detail="Unauthorized, Try to login again"
                )
            
        except HTTPException:
            raise

        except Exception as e:
            ic("Error Fetching user info : ",e)
            raise HTTPException(
                status_code=401,
                detail="Unauthorized, Try to login again"
            )

        ic(res.json()['auth'])
        return res.json()['auth']
    
    except HTTPException:
        raise

    except Exception as e:
        ic("Error : verifying token",e)

        raise HTTPException(
            status_code=500,
            detail="Something went wrong"
        )
    