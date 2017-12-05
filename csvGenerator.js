const fs = require('fs');
const file = fs.createWriteStream('books.csv');

function convertToCSV(number) {
    let book = {
        id: number,
        title: `title${number}`
    };
    let line = '';
    if(number === 0) {
        for (let index in book) {
            if (line != '') line += ','
            line += index;
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
function start(size, number){
    return new Promise((resolve, reject) => {
        if(isNaN(parseInt(size))) return reject('Введенное значение не число, а должно бы им быть :c');
        file.write(convertToCSV(number), err => {
            if (err) reject(err);
            if(number === 0) 
                {
                    resolve();
                } else {
                    size--; 
                    resolve();
                }
        });
    }).then(() => {
        if(size) {
            return start(size, number + 1);
        }
        return console.log('Writting is done');
    })
}
start(process.argv[2], 0)
    .catch(err => console.log(err));

