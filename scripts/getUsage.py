#!/usr/bin/env python3

import json
import requests
import shutil
import os

outFile = '../src/data/data.json'
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

def cacheUsageData(time, mode, elo):
    completeUrl = baseUrl + time + '/' + mode + '-' + elo + '.txt'
    cacheDirName = 'cache/' + time
    cacheFileName = 'cache/' + time + '/' + mode + '-' + elo + '.txt'

    if os.path.exists(cacheFileName):
        return

    os.makedirs(cacheDirName, exist_ok=True)
    r = requests.get(completeUrl)

    if (r.status_code != 200):
        print("http failure")
        print("url = " + completeUrl)
        print("response: ")
        print(r.text)
        exit()

    with open(cacheFileName, 'w') as file:
        file.write(r.text)


def getMonthData(time, mode, elo):
    cacheUsageData(time, mode, elo)
    cacheFileName = 'cache/' + time + '/' + mode + '-' + elo + '.txt'

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
    
def insertData(newData, month, mode, elo):
    if not month in result['byMonth'][mode]:
        result['byMonth'][mode][month] = {}
    result['byMonth'][mode][month][elo] = newData

with open(formatFileName) as formatFile:
    formats = json.load(formatFile)

with open(monthFileName) as monthFile:
    months = json.load(monthFile)

for mode in formats['formats']:
    firstMonth = mode['firstMonth']
    result['byPokemon'][mode['name']] = {
        'firstMonth': firstMonth
    }
    result['byMonth'][mode['name']] = {
        'firstMonth': firstMonth
    }

    formatMonths = months[months.index(firstMonth):]
    for month in formatMonths:
        result['byMonth'][mode['name']][month] = {}
        for elo in mode['elos']:
            dat = getMonthData(month, mode['name'], elo)
            insertData(dat, month, mode['name'], elo)

for mode in formats['formats']:
    allPokemon = {}
    
    formatMonths = months[months.index(mode['firstMonth']):]
    for month in formatMonths:
        for poke in result['byMonth'][mode['name']][month]['0']:
            if not poke['name'] in allPokemon:
                allPokemon[poke['name']] = True
    pokes = allPokemon.keys()

    for poke in pokes:
        result['byPokemon'][mode['name']][poke] = {}
        for elo in mode['elos']:
            result['byPokemon'][mode['name']][poke][elo] = {}
            for month in formatMonths:
                for rank in result['byMonth'][mode['name']][month][elo]:
                    if rank['name'] == poke:
                        result['byPokemon'][mode['name']][poke][elo][month] = rank

with open(outFile, 'w') as f:
    json.dump(result, f, indent=2)

