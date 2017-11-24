const fs = require('fs');

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
    var book = typeof obj != 'object' ? JSON.parse(obj) : obj;
    var str = '';
    var line = '';
    for (var index in book) {
        if (line != '') line += ','
        line += index;
    }
    str += line + '\r\n';
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
function ConvertToCSV(obj) {
    var book = typeof obj != 'object' ? JSON.parse(obj) : obj;
    var str = '';
    var line = '';
    for (var index in book) {
        if (line != '') line += ','
        line += book[index];
    }
    str += line + '\r\n';
    return str;
}

function start(){
    return new Promise((resolve, reject) => {
            fs.writeFile('books.csv', ConvertToCSV(book),  {'flag':'a'},  err => {
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
