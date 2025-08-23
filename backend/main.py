# backend/main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
# load .env inside backend folder
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
# -----------------------------
# Load environment variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY not found in .env file")

# Groq client
client = Groq(api_key=api_key)

# FastAPI app
app = FastAPI(title="EcoTrack Groq Backend")

# -----------------------------
# Firebase init
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_credentials.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

# -----------------------------
# Request Models
class ChatRequest(BaseModel):
    message: str

class LogActivityRequest(BaseModel):
    user_id: str
    activity: str
    points: int = 0

# -----------------------------
# Badges config
BADGE_RULES = {
    "Beginner": lambda points, activities, streak: points >= 50,
    "Eco Hero": lambda points, activities, streak: points >= 150,
    "Water Saver": lambda points, activities, streak: activities.get("water", 0) >= 5,
    "Energy Saver": lambda points, activities, streak: activities.get("energy", 0) >= 5,
    "Eco Enthusiast": lambda points, activities, streak: streak >= 3,
    "Green Streak Master": lambda points, activities, streak: streak >= 7,
}

# -----------------------------
# Endpoints

@app.get("/")
def root():
    return {"message": "EcoTrack AI backend running with Groq!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are EcoTrack AI Assistant. Help users with eco-friendly tips and sustainability advice."},
                {"role": "user", "content": request.message}
            ],
        )
        reply = response.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

@app.post("/log-activity")
async def log_activity(request: LogActivityRequest):
    try:
        user_ref = db.collection("users").document(request.user_id)
        user_doc = user_ref.get()

        # If user does not exist, create new record
        if not user_doc.exists:
            user_ref.set({"points": 0, "badges": [], "streak": 0, "last_activity": None})

        user_data = user_ref.get().to_dict()

        # ✅ Safely add points
        new_points = user_data.get("points", 0) + request.points

        # ✅ Update streak
        import datetime
        today = datetime.date.today()
        last_activity_date = user_data.get("last_activity")
        if last_activity_date:
            last_date = datetime.date.fromisoformat(last_activity_date)
            if (today - last_date).days == 1:
                user_data["streak"] = user_data.get("streak", 0) + 1
            elif (today - last_date).days > 1:
                user_data["streak"] = 1
        else:
            user_data["streak"] = 1

        # ✅ Badge logic
        badges = set(user_data.get("badges", []))
        new_badges = []

        if new_points >= 50 and "Beginner" not in badges:
            badges.add("Beginner")
            new_badges.append("Beginner")
        if new_points >= 100 and "Eco Hero" not in badges:
            badges.add("Eco Hero")
            new_badges.append("Eco Hero")
        if request.activity.lower().find("water") != -1 and "Water Saver" not in badges:
            badges.add("Water Saver")
            new_badges.append("Water Saver")

        # ✅ Save back to Firestore
        user_ref.update({
            "points": new_points,
            "badges": list(badges),
            "streak": user_data["streak"],
            "last_activity": today.isoformat(),
        })

        return {
            "message": f"Activity logged: {request.activity}",
            "points": new_points,
            "badges": list(badges),
            "new_badges": new_badges,
            "streak": user_data["streak"],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging activity: {str(e)}")

@app.get("/leaderboard")
async def leaderboard():
    try:
        users_ref = db.collection("users")
        users = users_ref.stream()

        leaderboard_data = []
        for user in users:
            data = user.to_dict()
            leaderboard_data.append({
                "user_id": user.id,
                "points": data.get("points", 0),
                "badges": data.get("badges", [])
            })

        # Sort by points descending
        leaderboard_data.sort(key=lambda x: x["points"], reverse=True)

        return {"leaderboard": leaderboard_data[:10]}  # top 10
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching leaderboard: {str(e)}")
