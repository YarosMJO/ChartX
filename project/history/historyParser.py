import os
import sqlite3
import operator
from collections import OrderedDict
# import matplotlib.pyplot as plt
import json


data_path = r"./project/history"
files = os.listdir(data_path)
history_db = os.path.join(data_path, 'History')
select_statement = "SELECT urls.url, urls.visit_count FROM urls, visits WHERE urls.id = visits.url;"

def parse():
	#path to user's history database (Chrome)
	#data_path = os.path.expanduser('~')+r"\AppData\Local\Google\Chrome\User Data\Default"
	#data_path = os.path.expanduser('~')+r"/.config/google-chrome/Default/databases"
	data = getData(False)

	sites_count = {} #dict makes iterations easier :D

	for url, count in data:
		url = parseURL(url)
		if url in sites_count:
			sites_count[url] += 1
		else:
			sites_count[url] = 1
	data = getData(True)
	# sites_count_sorted = OrderedDict(sorted(sites_count.items(), key=operator.itemgetter(1), reverse=True))
	# analyze (sites_count_sorted)

	return data
def getData(json_str = False,history_db = history_db, query = select_statement,):

    connect = sqlite3.connect(history_db)
    connect.row_factory = sqlite3.Row
    db = connect.cursor()
    rows = db.execute(query).fetchall()

    if json_str:
        return json.dumps( [dict(ix) for ix in rows] )


    connect.commit()
    connect.close()

    return rows

def parseURL(url):
	try:
		parsed_url_components = url.split("//")
		sublevel_split = parsed_url_components[1].split('/', 1)
		domain = sublevel_split[0].replace("www.", "").replace(".com.\*",".com")
		return domain

	except IndexError:
		print ("URL format error!")

def analyze(sites_count_sorted):
	# https://geekswipe.net/technology/computing/analyze-chromes-browsing-history-with-python/

	for site, count in sites_count_sorted.items():
		print (site, count)



