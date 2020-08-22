import csv

import requests
from bs4 import BeautifulSoup


def get_html(url):
    r = requests.get(url)
    return r.text


def get_total_pages(html):
    soup = BeautifulSoup(html, "html.parser")
    all_results = soup.find_all('table', class_='energy-res-tb')
    data = {}
    for table in all_results:
        for tr in table:
            len_empty_block = 1
            if len(tr) > len_empty_block:
                title = tr.find('th').text
                calories = tr.find('a', id="calories").text
                data[title] = calories
    return data


def main():
    url = 'http://www.takzdorovo.ru/db/nutritives/'
    html = get_html(url)
    data = get_total_pages(html)
    with open('media/ingredients.csv', 'w', encoding='utf-8') as output:
        writer = csv.writer(output)
        for key in data:
            result_row = key, data[key]
            writer.writerow(result_row)
