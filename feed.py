import os

import feedparser
import pprint
import json
import requests

strapi_token = os.environ["STRAPI_TOKEN"]
strapi_host = os.environ["STRAPI_HOST"]


def check_duplicate(link):
    url = f"https://{strapi_host}/api/blogs?pagination[page]=1&pagination[pageSize]=1&pagination[withCount]=true&filters[$and][0][link][$eq]={link}"

    payload = {}
    headers = {
        'Authorization': f'Bearer {strapi_token}'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    try:
        return response.json()['meta']['pagination']['total'] > 0
    except:
        return True


# 网站种子解析
feedblitz_baeldung = feedparser.parse('https://feeds.feedblitz.com/baeldung')
# 整理为JSON数组
for entry in feedblitz_baeldung['entries']:
    orignal_link = entry['feedburner_origlink']
    title= entry['title']
    # written= "".join(entry['authors'])
    tags = []
    for item in entry['tags']:
        tags.append(item['term'])
    # check if the link is already in the database
    if check_duplicate(orignal_link) is True:
        url = f"https://{strapi_host}/api/blogs"

        payload = json.dumps({
            "data": {
                "crawled": False,
                "link": orignal_link,
                "title": title,
                "categories_name": tags
            }
        })
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {strapi_token}'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        print(response.text)

    # pprint.pprint(entry)
