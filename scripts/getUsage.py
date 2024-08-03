#!/usr/bin/env python3

import json
import requests
import shutil
import os

baseUrl = 'https://www.smogon.com/stats/'
formatFileName = 'formats.json'
monthFileName = 'months.json'

result = {
        "byPokemon": {},
        "byMonth": {}
}

shutil.copy("months.json", "../src/data/months.json")
shutil.copy("formats.json", "../src/data/formats.json")
os.makedirs("../src/data/usage", exist_ok=True)
os.makedirs("cache", exist_ok=True)

def cacheUsageData(time, gen, mode, elo, lastFormatless):
    if (not lastFormatless is None and \
            months.index(month) <= months.index(lastFormatless)):
        completeUrl = baseUrl + time + '/' + mode + '-' + elo + '.txt'
    else:
        completeUrl = baseUrl + time + '/' + gen + mode + '-' + elo + '.txt'

    cacheDirName = 'cache/' + time
    cacheFileName = 'cache/' + time + '/' + gen + mode + '-' + elo + '.txt'

    if os.path.exists(cacheFileName):
        return

    os.makedirs(cacheDirName, exist_ok=True)
    r = requests.get(completeUrl)

    if (r.status_code != 200):
        print("http failure")
        print("gen = " + gen)
        print("mode = " + mode)
        print("url = " + completeUrl)
        print("response: ")
        print(r.text)
        exit()

    with open(cacheFileName, 'w') as file:
        file.write(r.text)


def getMonthData(time, gen, mode, elo, lastFormatless):
    cacheUsageData(time, gen, mode, elo, lastFormatless)
    cacheFileName = 'cache/' + time + '/' + gen + mode + '-' + elo + '.txt'

    with open(cacheFileName, 'r') as file:
        lines = file.read().split('\n')

    ret = [
    ]

    for line in lines[5:-2]:
        try:
            parts = line.split('|')
            rank = int(parts[1])
            name = parts[2].strip()
            pcnt = float(parts[3].strip()[:-1])
            usage = int(parts[4])
            entry = {
                "name": name,
                "percent": pcnt,
                "usage": usage, # note: usage is raw. should fix
                "rank": rank
            }
            
            ret.append(entry)
        except IndexError as err:
            print("index error")
            print("line: " + line)
            print(err)
            print("entire file: ")
            print(r.text)
            exit()

    return ret
    
def insertData(newData, month, gen, mode, elo):
    if not month in result['byMonth'][gen['name']][mode]:
        result['byMonth'][gen['name']][mode][month] = {}
    result['byMonth'][gen['name']][mode][month][elo] = newData

with open(formatFileName) as formatFile:
    formats = json.load(formatFile)

with open(monthFileName) as monthFile:
    months = json.load(monthFile)

for gen in formats['gens']:
    result['byPokemon'][gen['name']] = {}
    result['byMonth'][gen['name']] = {}
    for mode in gen['formats']:
        firstMonth = mode['firstMonth']
        result['byPokemon'][gen['name']][mode['name']] = {}
        result['byMonth'][gen['name']][mode['name']] = {
            'firstMonth': firstMonth
        }

        formatMonths = months[months.index(firstMonth):]
        if ('missingMonths' in mode):
            formatMonths = [element for element in formatMonths if element not \
                            in mode['missingMonths']]
        for month in formatMonths:
            result['byMonth'][gen['name']][mode['name']][month] = {}
            for elo in mode['elos']:
                lastFormatless = None
                if (gen['hasFormatless']):
                    lastFormatless = gen['lastFormatless']
                dat = getMonthData(month, gen['name'], mode['name'], elo,
                                   lastFormatless)
                insertData(dat, month, gen, mode['name'], elo)

for gen in formats['gens']:
    for mode in gen['formats']:
        allPokemon = {}
        
        formatMonths = months[months.index(mode['firstMonth']):]
        for month in formatMonths:
            for poke in result['byMonth'][gen['name']][mode['name']][month]['0']:
                if not poke['name'] in allPokemon:
                    allPokemon[poke['name']] = True
        pokes = allPokemon.keys()

        for poke in pokes:
            result['byPokemon'][gen['name']][mode['name']][poke] = {
                    'elos': mode['elos'],
                    'firstMonth': mode['firstMonth']
                }
            for elo in mode['elos']:
                result['byPokemon'][gen['name']][mode['name']][poke][elo] = {}
                for month in formatMonths:
                    for rank in result['byMonth'][gen['name']][mode['name']][month][elo]:
                        if rank['name'] == poke:
                            result['byPokemon'][gen['name']][mode['name']][poke][elo][month] = rank

for gen in formats['gens']:
    for mode in gen['formats']:
        formatMonths = months[months.index(mode['firstMonth']):]
        for month in formatMonths:
            for elo in mode['elos']:
                obj = result['byMonth'][gen['name']][mode['name']][month][elo]
                dirName = '../public/data/byMonth/' + gen['name'] + '/' + \
                    mode['name']+'/'+month
                fileName = dirName + '/' + elo + '.json'
                os.makedirs(dirName, exist_ok=True)
                with open(fileName, 'w') as f:
                    json.dump(obj, f, indent=2)

        for poke in result['byPokemon'][gen['name']][mode['name']].keys():
            obj = result['byPokemon'][gen['name']][mode['name']][poke]
            dirName = '../public/data/byPokemon/' + gen['name'] + '/' \
                +mode['name']
            fileName = dirName + '/' + poke + '.json'
            os.makedirs(dirName, exist_ok=True)
            with open(fileName, 'w') as f:
                json.dump(obj, f, indent=2)


