#!/usr/bin/env python3

import json

inFile = 'data.txt'
outFile = 'data.json'

with open(inFile, 'r') as f:
    lines = f.readlines()

entries = []

for line in lines[5:-1]:
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
    entries.append(entry)

with open(outFile, 'w') as f:
    json.dump(entries, f, indent=2)

