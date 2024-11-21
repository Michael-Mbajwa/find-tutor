import os
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from models import TutorRegistration

app = FastAPI(middleware=[
        Middleware(TrustedHostMiddleware, allowed_hosts=["*"]),
        Middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        ),
    ])


def create_json_files():
    if not os.path.exists("tutor.json"):
        with open("tutor.json", "w") as file:
            json.dump([], file)
    if not os.path.exists("requests.json"):
        with open("requests.json", "w") as file:
            json.dump([], file)


create_json_files()


@app.post("/register-tutor")
async def register_tutor(tutor: TutorRegistration):
    with open("tutor.json", "r") as file:
        tutors = json.load(file)

    tutor_data = tutor.dict()
    tutor_data["timestamp"] = datetime.now().isoformat()

    tutors.append(tutor_data)

    with open("tutor.json", "w") as file:
        json.dump(tutors, file, indent=4)

    print("Tutor Registered:", tutor_data)
    return {"message": "Tutor registered successfully!"}


@app.post("/tutors")
async def get_tutors(student_data: dict):
    with open("tutor.json", "r") as file:
        tutors = json.load(file)

    matched_tutors = []
    for tutor in tutors:
        for subject in tutor['subjects']:
            if (subject['subject'] == student_data['subject']
                    and student_data['level'] in subject['levels']):
                matched_tutors.append({
                    "first_name": tutor['name'].split()[0],
                    "last_name": tutor['name'].split()[-1],
                    "price": subject['price'],
                    "phone_number": tutor['phoneNumber'],
                    "email": tutor['email']
                })

    if not matched_tutors:
        raise HTTPException(status_code=404, detail="No matching tutor found")

    request_log = {
        "student_data": student_data,
        "timestamp": datetime.now().isoformat()
    }
    with open("requests.json", "r") as file:
        requests = json.load(file)
    requests.append(request_log)
    with open("requests.json", "w") as file:
        json.dump(requests, file, indent=4)

    return matched_tutors


# To run the server: `uvicorn main:app --reload`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8100)
