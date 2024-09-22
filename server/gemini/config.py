import json

# Conifgure Gemini Properties here

config = {
'temperature': 0,
'top_k': 20,
'top_p': 0.9,
'max_output_tokens': 1000,
"response_mime_type": "application/json"
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

CONFIG_FILE_PATH = 'gemini/base_settings.json'

def load_base_settings():
    with open(CONFIG_FILE_PATH, 'r') as file:
        settings = json.load(file)
        return settings
    
def save_base_settings(new_settings):
    with open(CONFIG_FILE_PATH, 'w') as file:
        json.dump(new_settings, file, indent=4)

def reset_base_settings(default_settings):
    save_base_settings(default_settings)