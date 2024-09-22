from gemini import rubric
from gemini.config import load_base_settings, save_base_settings, reset_base_settings
from gemini.response_analyzer import analyze_response

import json

class RubricManager:
    def __init__(self):
        # Load base settings
        self.base_settings = load_base_settings()['Rubric']
        self.rubric = None

    def create_rubric(self, model, solution):
        # Customize this rubric based on the solution, but using base settings
        guidelines = self.base_settings['guidelines']

        prompt = f"Generate the rubric for the following problem solution given. Split each into json object types bassed on the guidelines, and add any additional object types if you feel its needed. DO NOT INCLUDE ANY CODE. THIS IS MEANT TO REPLICATE AN INTERVIEW STYLE EXPLANATION. FORMAT IN JSON. Also assign point values to each section. Let's try and make it out of 100. Here are the guidelines: {guidelines}"
        response = model.generate_content([prompt, solution])

        try:
            self.rubric = json.loads(response.text)
        except json.JSONDecodeError as e:
            print(f"Invalid JSON: {e}")

        return self.rubric
    
    def adjust_rubric(self, setting: str, new_criteria: str):
        # Modify the base rubric settings
        self.base_settings[setting] = new_criteria
        save_base_settings(self.base_settings)

    def reset_rubric(self):
        # Reset rubric settings to original base state
        default_settings = {
            "rubric_criteria": {
                "key_terms": ["specific phrases", "concept", "formula"],
                "solution_format": "strict",
                "partial_credit_threshold": 0.7
            }
        }
    
    def get_rubric(self):
        return self.rubric