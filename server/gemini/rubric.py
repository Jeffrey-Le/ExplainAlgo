from gemini import rubric

def set_rubric(new_rubric: dict):
    rubric = new_rubric

def get_rubric():
    return rubric

def grade_response(response: str) -> float:
    return 1.0