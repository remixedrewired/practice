const fs = require('fs');
let size = process.argv[2];

let book = {
    id: 1,
    title: 1
};

function addBook() {
    for(property in book) {
        book[property] += 1;
    }
}

function Start(){
    return new Promise((resolve, reject) => {
        if(size !== 1) {
            fs.writeFile('file2.json', JSON.stringify(book) + ',',  {'flag':'a'},  function(err) {
                if (err) reject(err)
                else {
                    resolve();
                    addBook();
                    size--; 
                }
            });
        } else {
            fs.writeFile('file2.json', JSON.stringify(book),  {'flag':'a'},  function(err) {
                if (err) reject(err)
                else {
                    resolve();
                    addBook();
                    size--; 
                }
            });
        }
    }).then(() => {
        console.log(size);
        if(size) {
            return Start();
        } 
        return
    })
}

function BracketLeft() {
    return new Promise((resolve, reject) => {
        fs.writeFile('file2.json', '[',  {'flag':'a'},  function(err) {
            if (err) reject(err);
            resolve();
        });
    })
}
function BracketRigth(){
    return new Promise((resolve, reject) => {
        fs.writeFile('file2.json', ']',  {'flag':'a'},  function(err) {
            if (err) reject(err);
            resolve();
        });  
    })
}


BracketLeft()
    .then(Start)
    .then(BracketRigth)
    .catch((err) => console.log(err));
