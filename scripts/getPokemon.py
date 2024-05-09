#!/usr/bin/env python3

import pokebase as pb
import requests
import json

pokeApiUrl = 'https://pokeapi.co/api/v2/'
allPokeUrl = pokeApiUrl + 'pokemon?limit=10000&offset=0'
allResp = requests.get(allPokeUrl)
allPokes = json.loads(allResp.text)

pokeDataSet = {}

for poke in allPokes['results']:
    fullData = pb.pokemon(poke['name'])
    entry = {}
    key = poke['name'].replace('-', ' ').title()
    entry['display'] = key
    entry['name'] = poke['name']
    print(fullData.types[0].type.name)


#poke = pb.pokemon()

