const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'books.csv');

let f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

f = f.split("\n");
headers = f.shift().split(",");

let json = [];    
f.forEach(function(d){
    tmp = {}
    row = d.split(",")
    for(let i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    json.push(tmp);
});

let outPath = path.join(__dirname, 'books.json');
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
    function(err){console.log(err);});