import uuid


def create_uuid()->str:
    return uuid.uuid5(uuid.uuid4(),uuid.uuid4().__str__()).__str__()