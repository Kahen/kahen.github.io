import re

import requests
import json
import os
import datetime

kimi_token = os.environ["KIMI_TOKEN"]
strapi_token = os.environ["STRAPI_TOKEN"]
kimi_host = os.environ["KIMI_HOST"]
strapi_host = os.environ["STRAPI_HOST"]


def get_title_and_url():
    url = f"https://{strapi_host}/api/blogs?pagination[page]=1&pagination[pageSize]=1&pagination[withCount]=true&filters[$and][0][crawled][$eq]=false&filters[$and][1][title][$notContains]=Issue"

    headers = {
        'Authorization': f'Bearer {strapi_token}'
    }

    return requests.request("GET", url, headers=headers)


def updateStatus(id):
    import requests
    import json

    url = f"https://baeldungzh-cms.kahen.xyz/api/blogs/{id}"

    payload = json.dumps({
        "data": {
            "crawled": True
        }
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {strapi_token}'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)

    print(response.text)


def fetch_output(link, title):
    url = f"http://{kimi_host}:8000/v1/chat/schedule"

    payload = json.dumps({
        "model": "moonshot-v1-128k",
        "messages": [
            {
                "role": "user",
                "content": "翻译成中文,包括标题。除此之外不要说任何话。 \n链接：" + link + " \n1.注意category和tag和标题你要在页面文章信息中实时获取并翻译;\n2.date是页面的“Last updated”的值，不是当前时间;\n3.内容在输出标题后,标题也需要翻译 \n4.要求输出结果要有以下格式\n---\ndate: {yyyy-MM-DD}\ncategory:\n  - {category}\n  - {category2}\ntag:\n  - {tag1}\n  - {tag2}\nhead:\n  - - meta\n    - name: {keywords}\n      content: {SEO content}\n------\n# {标题} \n"
            }
        ],
        "use_search": True,
        "stream": False
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {kimi_token}'
    }

    response = requests.request("POST", url, headers=headers, data=payload)


    # Get today's date and format it as a string
    today = datetime.date.today().strftime('%Y-%m-%d')

    # Create the folder path
    folder_path = os.path.join('src', 'posts', 'baeldung')

    # Check if the folder exists
    if not os.path.isdir(folder_path):
        # If the folder does not exist, create it
        os.makedirs(folder_path)

    # Create the file path
    file_path = os.path.join(folder_path, f'{today}-{safe_title}.md')

    # The rest of your code...
    content = response.text
    if len(content) > 200:
        # Write the response to the file
        with open(file_path, 'w') as f:
            f.write(process_text(content))




def process_text(input_text):
    # 使用正则表达式找到所有的尖括号包围的文本
    matches = re.findall(r'<[^>]+>', input_text)

    # 遍历所有的匹配项
    for match in matches:
        # 使用反引号包裹每个匹配项
        replaced = f'`{match}`'
        # 在输入文本中替换匹配项
        input_text = input_text.replace(match, replaced)

    return input_text


blog_response = get_title_and_url()
print(f"blog_response:{blog_response}")
print(f"blog_response.text:{blog_response.text}")
blog = json.loads(blog_response.text)
url = blog['data'][0]['attributes']['link']
title = blog['data'][0]['attributes']['title']
# Replace unsafe characters
safe_title = re.sub('[^a-zA-Z0-9\n.]', ' ', title)
id = blog['data'][0]['id']
fetch_output(url, safe_title)
updateStatus(id)
