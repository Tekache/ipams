from pydantic import BaseModel
from datetime import datetime

class IPBase(BaseModel):
    address: str
    device: str
    status: str
    notes: str | None = None

class IPCreate(IPBase):
    pass

class IPUpdate(BaseModel):
    address: str | None = None
    device: str | None = None
    status: str | None = None
    notes: str | None = None
