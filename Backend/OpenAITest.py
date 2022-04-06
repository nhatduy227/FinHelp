import openai
import sys
import os

openai.api_key = "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"
with open(os.path.join(sys.path[0], "data.txt"), "r", encoding="utf8") as f:
    data = f.read()

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt= data, 
  temperature=0.7,
  max_tokens=64,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)

for key,values in response.items(): 
  if key == "choices": 
    for field in values:
      print(field.text)

