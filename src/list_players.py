# write json file based on image files

import os
import json

files = os.listdir("../public/football")
json_str = json.dumps(files)

with open("players.json", "w+", encoding="utf-8") as f:
    f.write(json_str)