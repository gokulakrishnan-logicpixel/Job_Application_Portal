from app.configs.pyjwt_config import jwt_token,PyJWTError,ExpiredSignatureError,DecodeError,JWT_ALG,JWT_SECRET

from icecream import ic
from datetime import timedelta,timezone,datetime
from fastapi.exceptions import HTTPException


def generate_token(data:dict,jwt_alg:str,jwt_secret:str,exp_min:int=0,exp_days:int=0,exp_sec:int=0):
    try:
        data['exp']=datetime.now(timezone.utc)+timedelta(days=exp_days,minutes=exp_min,seconds=exp_sec)
        data['iss']="Thamo authenticaton provider"

        token=jwt_token.encode(
            payload=data,
            key=jwt_secret,
            algorithm=jwt_alg
        )

        return token
    
    except Exception as e:
        ic(f"Something went wrong while creating token {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while creating token {e}"
        )
    

def verify_token(token:str,jwt_alg:str,jwt_secret:str)->dict:
    try:
        data=jwt_token.decode(
            jwt=token,
            key=jwt_secret,
            algorithms=jwt_alg
        )
        
        return data
    
    except (PyJWTError, ExpiredSignatureError, DecodeError):
        raise HTTPException(
            status_code=401,
            detail=f"Invalid token"
        )
    
    except Exception as e:
        ic(f"Something went wrong while verifying token {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while verifying token {e}"
        )
