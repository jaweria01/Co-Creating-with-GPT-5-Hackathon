from fastapi import FastAPI

app = FastAPI()

@app.get("/ping")
def ping():
    return {"message": "pong"}

@app.post("/log-activity")
def log_activity(activity: dict):
    # Dummy carbon score calculation
    activity_type = activity.get("type", "unknown")
    score = 42  # Dummy score
    return {"activity": activity_type, "carbon_score": score}
