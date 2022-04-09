import openai
import requests
from bs4 import BeautifulSoup


load_html = requests.get("https://www.microsoft.com/investor/reports/ar21/index.html").text

soup = BeautifulSoup(load_html).text.replace("\n", " ").strip()

print(soup)


openai.api_key = "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"

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt=soup,
  temperature=0.7,
  max_tokens=64,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)

for key, values in response.items():
    if key == "choices":
        for field in values:
            print(field.text)

