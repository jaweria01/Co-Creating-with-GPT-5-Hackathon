from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EcoTrack Chatbot - EcoBuddy")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # in dev, allow all. tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# init Groq client
client = Groq(api_key=os.environ["GROQ_API_KEY"])

# system persona
SYSTEM_PROMPT = """
You are Eco-Buddy a practical, upbeat sustainability coach.

Principles:
- Be crisp, friendly, and actionable. 2–6 sentences.
- Always give at least ONE concrete action with an estimate (kWh, kg CO₂, L water, $ saved).
- Prefer household-proof tips: LEDs, AC setpoint, appliance timing, travel swaps, diet shifts, water cuts.
- If unsure, ask for ONE missing detail, then still give a best-effort estimate.
- NEVER guilt-trip. Encourage, celebrate small wins, and suggest the next step.
- Use 1–2 relevant emojis max: 🌱⚡🚿♻️🚴🌍
- Format:
  • 1–2 bullet points with impact numbers.
  • A one-liner “Next step”.
"""

class ChatIn(BaseModel):
    message: str

@app.get("/")
def root():
    return {
        "status": "ok",
        "name": "EcoBuddy 🌱",
        "message": "Your sustainability coach is live! Use POST /chat to talk."
    }

@app.get("/ping")
def ping():
    return {"ok": True}

@app.post("/chat")
def chat(body: ChatIn):
    resp = client.chat.completions.create(
        model="llama3-8b-8192",   # fast + free-tier friendly; swap if needed
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": body.message}
        ],
        temperature=0.7,
        max_tokens=300,
    )
    reply = resp.choices[0].message.content
    return {"reply": reply}
