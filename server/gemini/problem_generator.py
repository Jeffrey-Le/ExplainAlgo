from flask import current_app
from gemini.rubric import RubricManager
import json

class ProblemGenerator:
    def __init__(self, model):
        self.model = model
        self.rubric_manager = RubricManager()


    def generate_problems(self, prompt: str) -> dict:
        response = self.model.generate_content(prompt)

        content = json.loads(response.text)

        problem = {
            "title": content['title'],
            "question": content['question'],
            "description": content['description'],
            "difficulty": content['difficulty'],
            "example": content['example'],
            "key_types": content['key_types']
        }

        return problem # Returns the problem

    def generate_solutions(self, problem: dict) -> dict:
        prompt = "Generate the solution for the following problem given."
        response = self.model.generate_content([prompt, problem])

        solution = json.loads(response.text)

        return solution

    def build_rubric(self, solution: dict) -> dict:
        rubric = self.rubric_manager.create_rubric(solution)
        return rubric