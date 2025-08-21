# backend/main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# -----------------------------
# Load .env from the same folder as main.py
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# Get OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY not found. Make sure your .env file exists in the same folder as main.py."
    )

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Initialize FastAPI app
app = FastAPI(title="EcoTrack GPT-5 Backend")

# -----------------------------
# Request body model
class ChatRequest(BaseModel):
    message: str

# -----------------------------
# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to EcoTrack GPT-5 Backend! Use /ping or /chat endpoints."}

# -----------------------------
# Favicon endpoint to avoid 404 in browser
@app.get("/favicon.ico")
def favicon():
    # You can place a favicon.ico in the backend folder if you want a real icon
    return FileResponse(os.path.join(os.path.dirname(__file__), "favicon.ico"))

# -----------------------------
# Simple ping endpoint
@app.get("/ping")
def ping():
    return {"message": "pong"}

# -----------------------------
# Chat endpoint
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-5-mini",  # using GPT-5 free credits
            messages=[
                {"role": "system", "content": "You are EcoTrack assistant."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"reply": response.choices[0].message["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
