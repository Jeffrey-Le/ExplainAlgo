import json

from gemini.config import load_base_settings

def analyze_response(model, response: str, rubric: dict) -> dict:
    feedback = None

    base_analyzer = load_base_settings()['Analyzer']

    prompt = base_analyzer['instructions']

    response = model.generate_content(f'{prompt} Rubric: {rubric}. Here is the response: {response}. Base the feedback on these criteria: {base_analyzer['feedback_criteria']}. Give partial credit points if the user quailifies for partial. Return response in JSON format. Put top-level objects in an array')

    #cleaned_response = json.dumps(response.text.replace('\n', '').replace('\\', ''))
   
    try:
        feedback = json.loads(response.text)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        print(f"Error position: {e.pos}")


    return feedback