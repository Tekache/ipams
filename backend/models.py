def ip_serializer(ip) -> dict:
    return {
        "id": str(ip["_id"]),
        "ip": ip.get("ip"),
        "device": ip.get("device", ""),
        "status": ip.get("status", "Available"),
        "notes": ip.get("notes", ""),
        "createdAt": str(ip.get("createdAt", "")),
    }
