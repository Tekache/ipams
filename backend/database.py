# backend/database.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "ipams")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# collection for IP addresses
ip_collection = db["ip_addresses"]
