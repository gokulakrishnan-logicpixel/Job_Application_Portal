import uuid
from fastapi.exceptions import HTTPException
from icecream import ic

def generate_unique_id(data:str):
    try:
        return str(uuid.uuid5(uuid.uuid4(),name=data))
    
    except Exception as e:
        ic(f"something went wrong while creating uuid {e}")
        raise HTTPException(
            status_code=500,
            detail=f"something went wrong while creating uuid {e}"
        )