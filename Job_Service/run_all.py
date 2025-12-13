import subprocess

# for candidate service
candidate_service=subprocess.Popen(
    ['cd','Candidate_Service']
)

candidate_service.wait()

candidate_service_to_st=subprocess.Popen(
    ['uvicorn','main:app','--reload']
)

candidate_service_to_st.wait()


# for notification service
notification_service=subprocess.Popen(
    ['cd','Notification_Services']
)

notification_service.wait()

notification_service_to_st=subprocess.Popen(
    ['uvicorn','main:app','--reload','--port','8001']
)

notification_service_to_st.wait()


# for job service
job_service=subprocess.Popen(
    ['cd','Job_Services']
)

job_service.wait()

job_service_to_st=subprocess.Popen(
    ['uvicorn','main:app','--reload','--port' ,'8002']
)

job_service_to_st.wait()