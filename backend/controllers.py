from bson import ObjectId
from database import ip_collection
from models import ip_serializer
from datetime import datetime
# from datetime import datetime

def create_ip(data):
    data["date_added"] = datetime.utcnow().isoformat()

    result = ip_collection.insert_one(data)
    new_ip = ip_collection.find_one({"_id": result.inserted_id})
    return ip_serializer(new_ip)


def get_all_ips():
    return [ip_serializer(ip) for ip in ip_collection.find()]

def create_ip(data):
    data["createdAt"] = datetime.now()
    result = ip_collection.insert_one(data)
    new_ip = ip_collection.find_one({"_id": result.inserted_id})
    return ip_serializer(new_ip)

def update_ip(id, data):
    ip_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    updated = ip_collection.find_one({"_id": ObjectId(id)})
    return ip_serializer(updated)

def delete_ip(id):
    ip_collection.delete_one({"_id": ObjectId(id)})
    return True
