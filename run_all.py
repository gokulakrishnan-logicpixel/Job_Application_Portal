import subprocess

# uvicorn main:app --reload --port {PORT}
services = [
    ("Candidate_Service", 8000),
    ("Notification_Services", 8001),
    ("Job_Services", 8002),
]

processes = []

for folder, port in services:
    print(f"Starting {folder} on port {port}")

    p = subprocess.Popen(
        [
            r".venv\Scripts\python.exe",   # run uvicorn using venv python
            "-m", "uvicorn",
            "main:app",
            "--reload",
            "--port", str(port)
        ],
        cwd=folder,  # this is your cd
        shell=True
    )

    processes.append(p)

print("\nAll services started.\nPress CTRL+C to stop.\n")

try:
    for p in processes:
        p.wait()
except KeyboardInterrupt:
    print("\nStopping all services...")
    for p in processes:
        p.terminate()
