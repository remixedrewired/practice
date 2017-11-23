const fs = require('fs');

let size = process.argv[2];
let book = {
    id: 1,
    title: 1
};

function addBook() {
   book.id += 1;
   book.title += 1;
}
function start(){
    return new Promise((resolve, reject) => {
        if(size !== 1) {
            fs.writeFile('books.json', JSON.stringify(book) + ',',  {'flag':'a'},  err => {
                if (err) reject(err);
                else {
                    addBook();
                    size--; 
                    resolve();
                }
            });
        } else {
            fs.writeFile('books.json', JSON.stringify(book),  {'flag':'a'},  err => {
                if (err) reject(err);
                else {
                    addBook();
                    size--;
                    resolve();
                }
            });
        }
    }).then(() => {
        if(size) {
            return start();
        }
        return console.log('Writting is done');
    })
}
function writeBracketLeft() {
    return new Promise((resolve, reject) => {
        fs.writeFile('books.json', '[',  {'flag':'a'},  err => {
            err ? reject(err): resolve();
        });
    })
}
function writeBracketRigth(){
    return new Promise((resolve, reject) => {
        fs.writeFile('books.json', ']',  {'flag':'a'},  err => {
            err ? reject(err): resolve();
        });  
    })
}

writeBracketLeft()
    .then(start)
    .then(writeBracketRigth)
    .catch(err => console.log(err));
