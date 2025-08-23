# 🌍 EcoTrack Backend  

Backend for the **EcoTrack** project, built with [FastAPI](https://fastapi.tiangolo.com/).  
It powers the frontend by handling **user activity logging, gamification, and leaderboard management**, with data stored in **Firebase**.  

---

## 🚀 Features  

- **Health Check** → `/ping` ensures the backend is alive.  
- **Activity Logging** → `/log-activity` records user activities (e.g., walking, cycling, car usage). 
- **Gamification**  
  - Assigns **carbon scores** to activities.  
  - Stores user progress and eco-friendly actions in **Firebase**.  
  - Powers a **leaderboard** (`/leaderboard`) to rank users based on sustainability efforts.  
- **Chat Endpoint** → `/chat` provides AI-powered sustainability tips.  

---

## 🛠️ Setup Instructions  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/umarabid123/Co-Creating-with-GPT-5-Hackathon.git
   cd Co-Creating-with-GPT-5-Hackathon/backend

2. **Create & activate virtual environment**

  ```bash
  python -m venv venv
  venv\Scripts\activate    
  source venv/bin/activate  


3. **Install dependencies**

  ```bash
  pip install -r requirements.txt

4. **Run the FastAPI server**

  ```bash
  uvicorn main:app --reload --port 8000


    The backend will be available at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)


## 📖 API Endpoints

1. **GET /ping**

*Response:*

{ "message": "pong" }

2. **POST /log-activity**

*Logs an activity and assigns a carbon score.*

**Request:**

*Example Request:*

{
  "type": "walking"
}

**Response:**

{
  "activity": "walking",
  "carbon_score": 42,
  "status": "logged successfully"
}

3. **GET /leaderboard**

Fetches the top eco-friendly users.

*Response:*

[
  { "user": "Alice", "score": 120 },
  { "user": "Bob", "score": 95 }
]

4. **POST /chat**

AI-powered sustainability assistant.

Request:

{ "message": "How can I reduce plastic waste?" }

## 🗄️ Database (Firebase)

Used as a real-time database to store:

- User profiles
- Activity logs
- Gamification scores & badges

Enables seamless leaderboard updates and cross-device syncing.

## 🏆 Gamification System

- Every activity (walking, cycling, public transport) earns eco points.
- Negative activities (car usage, high carbon) reduce score.
- Users compete on a global leaderboard.
- Rewards encourage sustainable lifestyle habits.

## 👩‍💻 For Developers

Always work inside the virtual environment:

  ```bash
  venv\Scripts\activate

After making changes:

```
    git add .
    git commit -m "Updated backend"
    git push origin main```