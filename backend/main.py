# backend/main.py
import os
import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# -----------------------------
# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY not found in .env file")

# Groq client
client = Groq(api_key=api_key)

# FastAPI app
app = FastAPI(title="EcoTrack Groq Backend")

# -----------------------------
# CORS Middleware
origins = [
    "http://localhost:3000",  # Local React dev
    "https://co-creating-with-gpt-5-hackathon.vercel.app"  # Deployed frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

class DeviceModel(BaseModel):
    user_id: str
    device_name: str

class EnergyUsageModel(BaseModel):
    user_id: str
    usage_kwh: float

# -----------------------------
# Badge Rules
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

# -----------------------------
# Chat Endpoint
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

# -----------------------------
# Log Activity + Gamification
@app.post("/log-activity")
async def log_activity(request: LogActivityRequest):
    try:
        user_ref = db.collection("users").document(request.user_id)
        user_doc = user_ref.get()

        if not user_doc.exists:
            user_ref.set({"points": 0, "badges": [], "streak": 0, "last_activity": None, "activities": {}})

        user_data = user_ref.get().to_dict()

        # Points update
        new_points = user_data.get("points", 0) + request.points

        # Streak update
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

        # Track activities
        activities = user_data.get("activities", {})
        activity_type = request.activity.lower()
        if "water" in activity_type:
            activities["water"] = activities.get("water", 0) + 1
        elif "energy" in activity_type:
            activities["energy"] = activities.get("energy", 0) + 1
        else:
            activities["other"] = activities.get("other", 0) + 1

        # Badge logic
        badges = set(user_data.get("badges", []))
        new_badges = []
        for badge, rule in BADGE_RULES.items():
            if rule(new_points, activities, user_data["streak"]) and badge not in badges:
                badges.add(badge)
                new_badges.append(badge)

        # Save user data
        user_ref.update({
            "points": new_points,
            "badges": list(badges),
            "streak": user_data["streak"],
            "last_activity": today.isoformat(),
            "activities": activities
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

# -----------------------------
# Leaderboard
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
                "badges": data.get("badges", []),
                "streak": data.get("streak", 0)
            })

        leaderboard_data.sort(key=lambda x: x["points"], reverse=True)
        return {"leaderboard": leaderboard_data[:10]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching leaderboard: {str(e)}")

# -----------------------------
# User Progress
@app.get("/user/{user_id}")
async def get_user(user_id: str):
    try:
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        return {
            "user_id": user_id,
            "points": user_data.get("points", 0),
            "badges": user_data.get("badges", []),
            "streak": user_data.get("streak", 0),
            "activities": user_data.get("activities", {}),
            "last_activity": user_data.get("last_activity"),
            "devices": user_data.get("devices", []),
            "energy_usage": user_data.get("energy_usage", 0),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user data: {str(e)}")

# -----------------------------
# Device Management
@app.post("/connect-device/")
async def connect_device(request: DeviceModel):
    try:
        user_ref = db.collection("users").document(request.user_id)
        user_doc = user_ref.get()
        if not user_doc.exists:
            user_ref.set({"points": 0, "badges": [], "streak": 0, "devices": [], "energy_usage": 0})

        user_data = user_ref.get().to_dict()
        devices = user_data.get("devices", [])

        if request.device_name not in devices:
            devices.append(request.device_name)
            user_ref.update({"devices": devices})

            # Award points
            points = user_data.get("points", 0) + 20
            user_ref.update({"points": points})

        return {"message": f"Device '{request.device_name}' connected", "devices": devices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting device: {str(e)}")

@app.post("/energy-usage/")
async def energy_usage(request: EnergyUsageModel):
    try:
        user_ref = db.collection("users").document(request.user_id)
        user_doc = user_ref.get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        user_ref.update({"energy_usage": request.usage_kwh})

        points = user_data.get("points", 0)
        if request.usage_kwh < 400:  # threshold
            points += 10
            user_ref.update({"points": points})

        return {"message": "Energy usage updated", "usage_kwh": request.usage_kwh}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating energy usage: {str(e)}")

@app.get("/eco-suggestions/{user_id}")
async def eco_suggestions(user_id: str):
    try:
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        suggestions = []

        if user_data.get("energy_usage", 0) > 500:
            suggestions.append("Your energy use is high. Try reducing AC usage or switching to LED lights.")

        if "solar_panel" in user_data.get("devices", []):
            suggestions.append("Great! Optimize your solar usage by running appliances in the daytime.")

        if user_data.get("streak", 0) < 3:
            suggestions.append("Start small! Turn off unused lights daily to build a green habit.")

        if user_data.get("points", 0) > 200:
            suggestions.append("You’re doing amazing! Try advanced eco steps like composting or rainwater harvesting.")

        if not suggestions:
            suggestions.append("Keep up the good work! Remember to unplug devices when not in use.")

        return {"user_id": user_id, "eco_suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating suggestions: {str(e)}")
