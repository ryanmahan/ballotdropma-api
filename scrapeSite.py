from bs4 import BeautifulSoup as Soup
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017")
mydb = client["ballotdrop"]
mycol = mydb["locations"]


with open("SoSpage.html", "r") as file: 
  city = {}
  for line in file:
    if line.startswith("<h2"):
      if len(city.keys()) > 0:
        mycol.insert_one(city)
        city = {}
      html = Soup(line, "html.parser")
      city["city"] = html.h2.get_text()[1:-1].strip().title()
    if "EMAIL" in line:
      html = Soup(line, "html.parser")
      if html.p.a:
        city["email"] = html.p.a.get_text().strip()
    if "FAX" in line: 
      html = Soup(line, "html.parser")
      if html.p:
       city["fax"] = html.p.get_text()[5:].strip()
    if "OFFICE ADDRESS" in line:
      html = Soup(line, "html.parser")
      city["address"] = html.p.get_text()[16:].strip()