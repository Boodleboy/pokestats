#!/usr/bin/env python3

import json
import requests

outFile = '../src/data/data.json'
baseUrl = 'https://www.smogon.com/stats/'
formatFileName = 'formats.json'

result = {
        "byPokemon": {},
        "byMonth": {},
        "months": []
}

def nextMonth(prev):
    parts = prev.split('-')
    if parts[1] == '12':
        nextMonth = '01'
        nextYear = str(int(parts[0])+1)
    else:
        nextMonth = str(int(parts[1])+1).zfill(2)
        nextYear = parts[0]
    return nextYear + '-' + nextMonth

def getMonthData(time, mode, elo):
    completeUrl = baseUrl + time + '/' + mode + '-' + elo + '.txt'
    r = requests.get(completeUrl)
    lines = r.text.split('\n')

    if (r.status_code != 200):
        print("http failure")
        print("url = " + completeUrl)
        print("response: ")
        print(r.text)
        exit()


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
                "usage": usage,
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
    for poke in newData:
        if not poke['name'] in result['byMonth'][mode][month].keys():
            result['byMonth'][mode][month][poke['name']] = {}

        result['byMonth'][mode][month][poke['name']][elo] = {
            'percent': poke['percent'],
            'rank': poke['rank']
        }


with open(formatFileName) as formatFile:
    formats = json.load(formatFile)

for mode in formats['modes']:
    month = mode['firstMonth']
    result['byPokemon'][mode['name']] = {
        'firstMonth': month
    }
    result['byMonth'][mode['name']] = {
        'firstMonth': month
    }

    while (month != formats['currentMonth']):
        #hacky way to add months to list. TODO: do this better
        if not month in result['months']:
            result['months'].append(month)

        result['byMonth'][mode['name']][month] = {}
        for elo in mode['elos']:
            dat = getMonthData(month, mode['name'], elo)
            insertData(dat, month, mode['name'], elo)
        month = nextMonth(month)

#TODO: compile the byPokemon data

with open(outFile, 'w') as f:
    json.dump(result, f, indent=2)

