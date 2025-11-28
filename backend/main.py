# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from bson import ObjectId
from datetime import datetime
from database import ip_collection

app = FastAPI(title="IP Address Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class IPBase(BaseModel):
    address: str
    device: Optional[str] = ""
    status: Optional[str] = "Available"
    notes: Optional[str] = ""


class IPCreate(IPBase):
    pass


class IPUpdate(BaseModel):
    address: Optional[str] = None
    device: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None


# helper serializer
def serialize_ip(doc) -> dict:
    return {
        "_id": str(doc["_id"]),
        "address": doc.get("address", ""),
        "device": doc.get("device", ""),
        "status": doc.get("status", ""),
        "notes": doc.get("notes", ""),
        "dateAdded": doc.get("dateAdded", None),
    }


@app.get("/api/ip/", response_model=List[dict])
def get_ips():
    docs = list(ip_collection.find().sort([("_id", 1)]))
    return [serialize_ip(d) for d in docs]


@app.post("/api/ip/", response_model=dict)
def create_ip(ip: IPCreate):
    if not ip.address or ip.address.strip() == "":
        raise HTTPException(status_code=400, detail="IP address is required")

    doc = {
        "address": ip.address.strip(),
        "device": ip.device or "",
        "status": ip.status or "Available",
        "notes": ip.notes or "",
        "dateAdded": datetime.utcnow().isoformat(),
    }
    result = ip_collection.insert_one(doc)
    new_doc = ip_collection.find_one({"_id": result.inserted_id})
    return serialize_ip(new_doc)


@app.put("/api/ip/{id}", response_model=dict)
def update_ip(id: str, ip: IPUpdate):
    from bson import ObjectId

    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    existing = ip_collection.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(status_code=404, detail="IP not found")

    # prepare update fields but keep dateAdded
    updated = {
        "address": ip.address if ip.address is not None else existing.get("address", ""),
        "device": ip.device if ip.device is not None else existing.get("device", ""),
        "status": ip.status if ip.status is not None else existing.get("status", ""),
        "notes": ip.notes if ip.notes is not None else existing.get("notes", ""),
        "dateAdded": existing.get("dateAdded"),
    }

    ip_collection.update_one({"_id": obj_id}, {"$set": updated})
    new_doc = ip_collection.find_one({"_id": obj_id})
    return serialize_ip(new_doc)


@app.delete("/api/ip/{id}", response_model=dict)
def delete_ip(id: str):
    from bson import ObjectId

    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    result = ip_collection.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="IP not found")

    return {"message": "Deleted"}
