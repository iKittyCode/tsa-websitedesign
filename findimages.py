import wikipedia
import json

content = None
newround1content = []
try: 
    with open ("accurate_people.json", "r", encoding='utf-8') as f:
        content = json.load(f)
    
    for j in content: 
        
        resultlist = j["description"].split("(")
        j["name"] = resultlist[0]
        newround1content.append(j)
        
except Exception as e:
    print(f"An error occurred: {e}")




    

