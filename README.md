# AI Therapy Simulator 2027

AI Therapy Simulator 2027 is a small full-stack app where you play as an AI technician that has to give therapy to a chaotic AI patient and help it work through its problems. The app combines a React frontend, FastAPI backend, and PostgreSQL database, and each session is scored based on how well your responses guide the patient toward progress.

## Features

- Create and manage therapy sessions
- Chat with AI patients that have different personalities and core problems
- Generate suggested therapist responses for each turn
- Track dialogue history, scores, and session outcomes

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI, SQLModel, PostgreSQL database (hosted externally)
- AI: Google Gemini via `google-genai`

## Project Structure

- `frontend/` - React app and UI
- `backend/` - FastAPI server and database models

## Getting Started

### Backend

1. Create and activate a virtual environment.
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set the required environment variables:
   - `DATABASE_URL`
   - `GOOGLE_AI_KEY`

4. Start the backend from the `backend/` folder:

   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Install dependencies from the `frontend/` folder:

   ```bash
   yarn install
   ```

2. Start the Vite dev server:

   ```bash
   yarn dev
   ```

## Screenshots

### Start screen

![Title Screen](./screenshots/start.png)

### Session screen

![Start a therapy session with grok](./screenshots/session_0.png)
![insult the AI instead of giving therapy](./screenshots/session_1.png)
![try to be helpful and get insulted back](./screenshots/session_2.png)

### Result screen

![Get a final score](./screenshots/result.png)

## Notes

- The frontend runs on `http://localhost:5173`
- The backend enables CORS for the local frontend during development
