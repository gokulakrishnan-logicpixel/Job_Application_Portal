from enum import Enum


class ApplicationStatusEnum(Enum):
    WAITING="WAITING"
    IN_REVIEW="IN REVIEW"
    REJECTED="REJECTED"
    ACCEPTED="ACCEPTED"
    DISCLOSED="DISCLOSED"