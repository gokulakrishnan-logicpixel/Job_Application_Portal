from abc import ABC, abstractmethod


class AuthModel(ABC):
    @abstractmethod
    async def add(*args,**kwargs):
        ...

    @abstractmethod
    async def update_password(*args,**kwrgs):
        ...

    @abstractmethod
    async def delete(*args,**kwrgs):
        ...

    @abstractmethod
    async def get(*args,**kwrgs):
        ...

    @abstractmethod
    async def get_byid(*args,**kwrgs):
        ...