import requests
from bs4 import BeautifulSoup
import json
data = []
food_page = requests.get("https://www.aplustopper.com/food-names/")
food = BeautifulSoup(food_page.content, "html.parser")
food_content = food.select(".entry-content ul:nth-of-type(2) li")
food_content = [name.text for name in food_content[0:20]]
data.append(food_content)
# categories = {"foods": {}, }
# for i, li in enumerate(food_content):
#     categories['foods'][i] = li.text
# print(categories)

famous_persons_page = requests.get(
    "https://www.thetealmango.com/featured/most-famous-persons-in-the-world/")
famous_persons = BeautifulSoup(famous_persons_page.content, "html.parser")
famous_persons_content = famous_persons.select("h3")
famous_persons_content = famous_persons_content[0:20]
famous_persons_content = [name.text[3:].strip()
                          for name in famous_persons_content]
data.append(famous_persons_content)

countries_page = requests.get(
    "https://www.cntraveler.com/story/top-countries-in-the-world")
countries = BeautifulSoup(countries_page.content, "html.parser")
countries_names = countries.select(".body__inner-container ol li strong")
countries_names = [name.text for name in countries_names]
data.append(countries_names)

animals_page = requests.get(
    "https://list25.com/25-most-popular-animals-on-google-search/")
animals = BeautifulSoup(animals_page.content, "html.parser")
animals_names = animals.select(".item-header .item-title")
animals_names = [name.text for name in animals_names]
animals_names = animals_names[0:20]
data.append(animals_names)

categories_name = ['food', 'celebrities', 'countries', 'animals']
json_object = {}
for i, category in enumerate(categories_name):
    json_object[i] ={"name":categories_name[i],"values":data[i]}


hangman_data = open("hangman_data.json", 'w')
json.dump(json_object, hangman_data, indent=6)
hangman_data.close()
