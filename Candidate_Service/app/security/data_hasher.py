from app.configs.argon2_config import PH,VerifyMismatchError
from fastapi.exceptions import HTTPException
from icecream import ic


def hash_data(data:str):
    try:
        hashed_data=PH.hash(data)
        return hashed_data
    
    except Exception as e:
        ic(f"Something went wrong while hashing data : {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while hashing data : {e}"
        )
    
def verify_hashed_data(hashed_data:str,plain_data:str):
    try:
        PH.verify(hash=hashed_data,password=plain_data)
        return True
    
    except VerifyMismatchError:
        ic(f"Error : while verifying hash")
        raise HTTPException(
            status_code=401,
            detail=f"Invalid data"
        )
    
    except HTTPException:
        raise

    except Exception as e:
        ic(f"Something went wrong while verifying hash {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Something went wrong while verifying hash {e}"
        )
