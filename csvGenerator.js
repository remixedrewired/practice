const fs = require('fs');
const file = fs.createWriteStream('books.csv');


let isHeader = true;
let book = {
    id: 1,
    get title () {
        return 'title' + this.id;
    }
};

function addBook() {
   book.id += 1;
}
function convertToCSV(obj) {
    let book = typeof obj != 'object' ? JSON.parse(obj) : obj;
    let line = '';
    if(isHeader) {
        for (let index in book) {
            if (line != '') line += ','
            line += index;
            isHeader = false;
        }
    } else {
        for (let index in book) {
            if (line != '') line += ','
            line += book[index];
        }
    } 
    line = line + '\n';
    return line;
}
function addHeader(){
    return new Promise((resolve, reject) => {
        file.write(convertToCSV(book), err => {
            err ? reject(err) : resolve();;
        });   
    })
}

function start(size){
    return new Promise((resolve, reject) => {
            file.write(convertToCSV(book), err => {
                if (err) reject(err);
                else {
                    addBook();
                    size--; 
                    resolve();
                }
            });
    }).then(() => {
        if(size) {
            return start(size);
        }
        return console.log('Writting is done');
    })
}
addHeader()
    .then(start(process.argv[2]))
    .catch(err => console.log(err));
