from fastapi import Depends,HTTPException,Request
from fastapi.security.http import HTTPAuthorizationCredentials,HTTPBearer
from app.operation.Auth.authentication import Auth
from app.database.configs.pg_config import get_pg_db_session,AsyncSession
from app.security.token_generation import verify_token,JWT_ALG,JWT_SECRET
from icecream import ic

bearer=HTTPBearer()

async def verify(request:Request,credentials:HTTPAuthorizationCredentials=Depends(bearer),session:AsyncSession=Depends(get_pg_db_session)):
    try:
        token=credentials.credentials
        token_data=verify_token(
            token=token,
            jwt_alg=JWT_ALG,
            jwt_secret=JWT_SECRET
        )

        verified_auth=await Auth(session=session).is_authid_exists(auth_id_email=token_data['id'])
        
        if not verified_auth:
            raise HTTPException(
                status_code=401,
                detail="invalid token"
            )
        
        await session.close()
        
        return verified_auth
    
    except HTTPException:
        raise

    except Exception as e:
        await session.close()
        ic(f"Something went wrong while verifing auth {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while verifing auth {e}"
        )