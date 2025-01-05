from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from .config import settings

client = None
db = None

async def init_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DB_NAME]
