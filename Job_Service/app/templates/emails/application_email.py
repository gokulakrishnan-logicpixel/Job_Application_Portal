def get_appication_applied_email_content(candidate_name:str,website_link:str,job_name:str,job_role:str):
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Job Application Submitted</title>
</head>

<body class="bg-gray-100 py-10">
  <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Application Received</h2>

    <p class="text-gray-700 leading-relaxed mb-4">
      Hi <span class="font-semibold">{candidate_name}</span>,  
    </p>

    <p class="text-gray-700 leading-relaxed mb-4">
      Thank you for applying for the <span class="font-semibold">{job_role}</span> position for
      <span class="font-semibold">{job_name}</span>.
    </p>

    <p class="text-gray-700 leading-relaxed mb-4">
      Your application has been successfully submitted. Our recruitment team will review your profile and contact you if you are shortlisted.
    </p>

    <div class="mt-6">
      <a
        href="{website_link}"
        class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Your Application
      </a>
    </div>

    <p class="text-gray-500 text-sm mt-8">This is an automated email, please do not reply.</p>
  </div>
</body>
</html>
"""


def get_application_status_email_content(candidate_name:str,website_link:str,status:str,job_role:str):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Application Status Update</title>
</head>

<body class="bg-gray-100 py-10">
  <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Application Status Update</h2>

    <p class="text-gray-700 leading-relaxed mb-4">
      Hi <span class="font-semibold">{candidate_name}</span>,
    </p>

    <p class="text-gray-700 leading-relaxed mb-4">
      The status of your application for the <span class="font-semibold">{job_role}</span> role has been updated.
    </p>

    <div class="border-l-4 border-blue-500 pl-4 my-4">
      <p class="text-gray-800 font-semibold">
        Current Status: <span class="text-blue-600">{status}</span>
      </p>
      <p class="text-gray-600 text-sm mt-1">
        (Examples: Waiting List, Under Review, Shortlisted, Rejected, Selected)
      </p>
    </div>

    <p class="text-gray-700 leading-relaxed mb-4">
      You can log in to your candidate portal to view more details or take further actions.
    </p>

    <div class="mt-6">
      <a
        href="{website_link}"
        class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Check Status
      </a>
    </div>

    <p class="text-gray-500 text-sm mt-8">This is an automated email, please do not reply.</p>
  </div>
</body>
</html>"""