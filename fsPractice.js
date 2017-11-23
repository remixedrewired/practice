
const fs = require('fs');
const writeStream = fs.createWriteStream('file2.json');
let size = process.argv[2];

console.log(size);

let book = {
    id: 1,
    title: 1
}

function addBook() {
    for(property in book) {
        book[property] += 1;
    }
}

function Start(){
    return new Promise((res, rej) => {
        if(size !== 1) {
            fs.writeFile('file2.json', JSON.stringify(book) + ',',  {'flag':'a'},  function(err) {
                if (err) rej(err)
                else res();
            });
        } else {
            fs.writeFile('file2.json', JSON.stringify(book),  {'flag':'a'},  function(err) {
                if (err) rej(err)
                else res();
            });
        }
        addBook();
        size--; 
    }).then(() => {
        console.log(size);
        if(size) {
            return Start()
        } 
        return
    })
}

function BracketLeft() {
    return new Promise((res, rej) => {
        fs.writeFile('file2.json', '[',  {'flag':'a'},  function(err) {
            if (err) {
                return console.error(err);
            }
        });
        res();
    })
}


BracketLeft().then(Start).then(() => {
    fs.writeFile('file2.json', ']',  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }
    });
})
