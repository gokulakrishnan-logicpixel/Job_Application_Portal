from abc import ABC,abstractmethod


class BaseServiceModel(ABC):
    
    @staticmethod
    @abstractmethod
    async def send(*args,**kwargs):
        ...