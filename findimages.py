import requests
import json
from dotenv import load_dotenv
import os
from serpapi.google_search import GoogleSearch
load_dotenv()
secret_key = os.getenv("SECRET_KEY")
content = None
newround1content = []
newround2content = []


try: 
    with open ("accurate_people.json", "r", encoding='utf-8') as f:
        content = json.load(f)
    
    for j in content: 
        
        resultlist = j["description"].split("(")
        j["name"] = resultlist[0]
        newround1content.append(j)

except Exception as e:
    print(f"An error occurred: {e}")
for lab in newround1content: 
    params = {
    "engine": "google_images",
    "q": lab["name"],
    "location": "Austin, Texas, United States",
    "google_domain": "google.com",
    "hl": "en",
    "gl": "us",
    "api_key": secret_key
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    images_results = results["images_results"]
    lab["image"] = images_results[0]["original"]
    newround2content.append(lab)
with open ("accurate_people.json", "w" ) as f: 
    json.dump(newround2content,f , indent=4)


    

