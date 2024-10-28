from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from app.db.database import get_db_connection
from app.models.feedback import save_feedback
import aiofiles
import os
import requests

router = APIRouter()

UPLOAD_FOLDER = "uploads"
GROQ_API_URL = "https://api.groq.com/analyze"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")  

@router.post("/analyze")
async def analyze_thumbnail(thumbnail: UploadFile = File(...)):
    if thumbnail.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid image type. Only PNG and JPEG are allowed.")

    file_location = f"{UPLOAD_FOLDER}/{thumbnail.filename}"
    async with aiofiles.open(file_location, 'wb') as out_file:
        content = await thumbnail.read()
        await out_file.write(content)

    with open(file_location, "rb") as image_file:
        response = requests.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}"
            },
            files={"image": image_file}
        )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error from Groq API")

    result = response.json()
    score = result.get("score")
    comment = result.get("comment")

    save_feedback(file_location, score, comment)

    return JSONResponse(content={"score": score, "comment": comment})
