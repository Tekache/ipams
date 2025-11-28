from fastapi import APIRouter
from schemas import IPCreate, IPUpdate
from controllers import get_all_ips, create_ip, update_ip, delete_ip

router = APIRouter()

@router.get("/")
def get_ips():
    return get_all_ips()

@router.post("/")
def add_ip(ip: IPCreate):
    return create_ip(ip.dict())

@router.put("/{id}")
def edit_ip(id: str, ip: IPUpdate):
    return update_ip(id, ip.dict(exclude_none=True))

@router.delete("/{id}")
def remove_ip(id: str):
    delete_ip(id)
    return {"message": "Deleted"}
