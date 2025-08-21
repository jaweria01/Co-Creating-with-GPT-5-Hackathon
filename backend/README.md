# EcoTrack Backend

This is the backend for the **EcoTrack** project, built with [FastAPI](https://fastapi.tiangolo.com/).

## 🚀 Features

- `/ping` → Health check endpoint (returns `pong`).
- `/log-activity` → Dummy activity logger that calculates a placeholder carbon score.

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/umarabid123/Co-Creating-with-GPT-5-Hackathon.git
   cd Co-Creating-with-GPT-5-Hackathon/backend
2. **Create and activate virtual environment**

python -m venv venv
*Activate (Windows PowerShell)*
venv\Scripts\activate
3. **Install dependencies**

pip install -r requirements.txt
4. **Run the FastAPI server**
uvicorn main:app --reload
The backend will be available at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)


## 📖 API Endpoints
**GET /ping**
*Example Response:*

{
  "message": "pong"
}
POST /log-activity
*Example Request:*

{
  "type": "walking"
}
*Example Response:*
{
  "activity": "walking",
  "carbon_score": 42
}
# 👩‍💻 For Developers
Make sure you are always working inside the virtual environment (venv).

After making changes, commit and push:

git add .

git commit -m "Updated backend"

git push origin main