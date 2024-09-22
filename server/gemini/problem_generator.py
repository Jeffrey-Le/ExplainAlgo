from flask import current_app
from gemini.rubric import RubricManager
import json

class ProblemGenerator:
    def __init__(self, model, rubric_manager):
        self.model = model
        self.rubric_manager = rubric_manager

    def generate_problems(self, prompt: str) -> dict:
        response = self.model.generate_content(prompt)

        print(response.text)

        content = json.loads(response.text)

        print(content)

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
        #prompt = "Generate the solution for the following problem given."
        prompt = "Based on the problem given, create a written solution to how this problem can be solved as if you are giving an interview answer. Use the default parameters in your system, but also feel free to expand on it to make it detailed. Don't provide any code. Instead, explain the code in word form, like it was an interview. The user should be able to code the solution based on your explanation. Return in JSON Format."

        data = f"{prompt}: {problem}"

        response = self.model.generate_content(data)

        cleaned_response = response.text.replace('\n', '').replace('\\', '')

        print(cleaned_response)

        try:
            content = json.loads(cleaned_response)
        except json.JSONDecodeError as e:
            print(f"Invalid JSON: {e}")

        solution = {
            "solution": content["solution"]
        }

        return solution

    def build_rubric(self, solution: dict) -> dict:
        rubric = self.rubric_manager.create_rubric(self.model, solution)
        return rubric