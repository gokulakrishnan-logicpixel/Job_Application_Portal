from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession

class BaseCrud(ABC):
    def __init__(self, session: AsyncSession):
        self.session = session

    @abstractmethod
    async def create(self, *args, **kwargs):
        ...

    @abstractmethod
    async def update(self, *args, **kwargs):
        ...

    @abstractmethod
    async def delete(self, *args, **kwargs):
        ...

    @abstractmethod
    async def get_by_id(self, *args, **kwargs):
        ...

    @abstractmethod
    async def get_all(self, *args, **kwargs):
        ...
