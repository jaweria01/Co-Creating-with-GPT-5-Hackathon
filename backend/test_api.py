import requests
import os

# 🌍 Replace with your current ngrok URL
BASE_URL = os.getenv("BASE_URL", "https://37855cceba94.ngrok-free.app")

def test_ping():
    r = requests.get(f"{BASE_URL}/ping")
    print("Ping:", r.json())

def test_chat():
    payload = {"message": "Give me one eco-friendly habit"}
    r = requests.post(f"{BASE_URL}/chat", json=payload)
    print("Chat:", r.json())

def test_log_activity(user_id="user123", activity="Logged LED switch", points=50):
    payload = {"user_id": user_id, "activity": activity, "points": points}
    r = requests.post(f"{BASE_URL}/log-activity", json=payload)
    print("Log Activity:", r.json())

def test_leaderboard():
    r = requests.get(f"{BASE_URL}/leaderboard")
    print("Leaderboard:", r.json())

if __name__ == "__main__":
    print("🔹 Running EcoTrack Backend Tests 🔹\n")

    test_ping()
    test_chat()
    test_log_activity("user123", "Logged LED switch", 50)
    test_log_activity("user123", "Reduced water", 100)
    test_leaderboard()
