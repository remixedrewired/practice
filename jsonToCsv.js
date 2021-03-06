const fs = require('fs');
const writeStream = require('stream');

let size = process.argv[2];
let book = {
    id: 1,
    get title () {
        return 'title' + this.id;
    }
};

function addBook() {
   book.id += 1;
}
function generateHeader(obj) {
    let book = typeof obj != 'object' ? JSON.parse(obj) : obj;
    let str = '';
    let line = '';
    for (var index in book) {
        if (line != '') line += ','
        line += index;
    }
    str += line + '\n';
    return str;
}
function addHeader(obj){
    return new Promise((resolve, reject) => {
        fs.writeFile('books.csv', generateHeader(book),  {'flag':'a'},  err => {
            if(err) reject();
        });
       resolve();
    })
}
function convertToCSV(obj) {
    let book = typeof obj != 'object' ? JSON.parse(obj) : obj;
    let str = '';
    let line = '';
    for (var index in book) {
        if (line != '') line += ','
        line += book[index];
    }
    str += line + '\n';
    return str;
}

function start(){
    return new Promise((resolve, reject) => {
            fs.writeFile('books.csv', convertToCSV(book),  {'flag':'a'},  err => {
                if (err) reject(err);
                else {
                    addBook();
                    size--; 
                    resolve();
                }
            });
    }).then(() => {
        if(size) {
            return start();
        }
        return console.log('Writting is done');
    })
}

addHeader(book)
    .then(start)
    .catch(err => console.log(err));
