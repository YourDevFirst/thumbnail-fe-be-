from fastapi import FastAPI
from app.routes import analyze
import uvicorn

app = FastAPI()

app.include_router(analyze.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
