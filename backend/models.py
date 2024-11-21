from pydantic import BaseModel
from typing import List


class SubjectDetail(BaseModel):
    subject: str
    levels: List[int]
    price: str


class TutorRegistration(BaseModel):
    name: str
    studentId: str
    email: str
    phoneNumber: str
    dob: str
    subjects: List[SubjectDetail]
