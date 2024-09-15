from gemini import rubric
from gemini.config import load_base_settings, save_base_settings, reset_base_settings

class RubricManager:
    def __init__(self):
        # Load base settings
        self.base_settings = load_base_settings()['Rubric']

    def create_rubric(self, solution):
        # Customize this rubric based on the solution, but using base settings
        guidelines = self.base_settings['guidelines']
        rubric = {
            "key_concepts": guidelines['key_concepts'],
            "correctness": guidelines['correctness']
        }
        return rubric
    
    def adjust_rubric(self, new_criteria):
        # Modify the base rubric settings
        self.base_settings['rubric_critera'] = new_criteria
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

    def grade_response(self, response: str) -> float:
        
        return 1.0

# def set_rubric(new_rubric: dict):
#     rubric = new_rubric

# def get_rubric():
#     return rubric

# def grade_response(response: str) -> float:
#     return 1.0