import sys
sys.path.append('/usr/local/lib/python3.8/site-packages')

import requests
from bs4 import BeautifulSoup
import re
import json
import time

def scrape_basking_ridge_full():
    url = "https://en.wikipedia.org/wiki/Basking_Ridge,_New_Jersey"
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    print("Fetching full historical text (no limits)...")
    try:
        response = requests.get(url, headers=headers)
        time.sleep(1) 
        
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        content = soup.find('div', {'id': 'mw-content-text'})
        
        # Regex to find dates
        full_date_pattern = re.compile(r'((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4})|(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})|(\b(17|18|19|20)\d{2}\b)')
        
        results = []

        for element in content.find_all(['li']):
            text = element.get_text().strip()
            match = full_date_pattern.search(text)
            
            # We only want entries that have a date AND are reasonably long (avoiding menu items)
            if match and len(text) > 40:
                date_str = match.group(0)
                
                # CLEANING ONLY - NO TRUNCATION
                # We remove the [1] citations and newlines, but we KEEP the full text.
                clean_desc = re.sub(r'\[\d+\]', '', text).replace('\n', ' ')
                
                results.append({
                    "date": date_str,
                    "description": clean_desc  # <--- SAVING FULL TEXT HERE
                })

        # Remove duplicates
        unique_results = []
        seen = set()
        people_results = []
        for item in results:
            # Check the first 60 chars just to identify duplicates, but save the whole thing
            if item['description'][:60] not in seen:
                unique_results.append(item)
                seen.add(item['description'][:60])
                for jbob in unique_results: 
                    if "born" in jbob["description"]:


        with open("accurate_events.json", "w") as f:
            json.dump(unique_results, f, indent=4)
            
        print(f"Success! Saved {len(unique_results)} full-length events to accurate_events.json.")
    
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    scrape_basking_ridge_full()