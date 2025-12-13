from abc import ABC,abstractmethod

class BaseCrud(ABC):
    @abstractmethod
    async def add(*args,**kwargs):
        ...

    @abstractmethod
    async def update(*args,**kwargs):
        ...

    @abstractmethod
    async def get(*args,**kwargs):
        ...
    
    @abstractmethod
    async def get_byid(*args,**kwargs):
        ...

    @abstractmethod
    async def delete(*args,**kwargs):
        ...

