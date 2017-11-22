
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
        writeStream.write(JSON.stringify(book) + ',');
        } else {
        writeStream.write(JSON.stringify(book));
        }
        addBook();
        size--; 
        res();

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
        writeStream.write('[');
        res();
    })
}


BracketLeft().then(Start).then(() => {
    writeStream.write(']');
})

/*
function Write(number) {
    return new Promise((res, rej) => {
            let book = {
                title:'title' + number,
                id:number
            };
            let stringifiedBook = JSON.stringify(book);
            res(stringifiedBook);            
    })
}

function WriteWrap(number) {
    return Write(number)
        .then((res) => {
                    fs.appendFile("file2.json", res, (err) => {
                        if(err) throw new Error('Something gone incorrect :(');
                        console.log('Writting done :)');
                    });
                    if(number > 10000) return;
                    return WriteWrap(number + 1);                
            })};    
*/