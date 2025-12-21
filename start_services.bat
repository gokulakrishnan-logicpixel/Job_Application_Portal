@echo off
echo Starting College Project Services...

echo Starting Candidate Service on Port 8000...
start "Candidate Service" /D "Candidate_Service" cmd /k "python -m uvicorn main:app --reload --port 8000"

echo Starting Job Service on Port 8001...
start "Job Service" /D "Job_Service" cmd /k "python -m uvicorn main:app --reload --port 8001"

echo Starting Notification Service on Port 8002...
start "Notification Service" /D "Notification_Services" cmd /k "python -m uvicorn main:app --reload --port 8002"

echo Starting Frontend...
start "Frontend" /D "Job_App/Job_App" cmd /k "npm run dev"

echo All services started in separate windows.
pause
