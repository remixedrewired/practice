const fs = require('fs');
const { Transform } = require('stream');
const server = require('http').createServer();

let size = process.argv[2];
let booksArray = []
let test = fs.createWriteStream('./file1.txt');

for(let i=0; i <= size; i++) {
    booksArray.push({title:`title${i}`, id:`${i}`});
}
console.log(booksArray);
let stringifiedArray = JSON.stringify(booksArray);
test.write(stringifiedArray.toString());

class ToJSON extends Transform {
    constructor(options = {}){
        options = Object.assign({}, options, {
            decodeStrings:false
        });
        super(options);
    }

    _transform(chunk, encoding, callback) {
        if(encoding !== 'utf8') {
            this.emit('error', new Error('User uft8 pls brah'));
            return callback();
        }
        this.push(chunk);
        callback();
    }
}

fs.createReadStream('./file1.txt', 'utf-8')
    .pipe(new ToJSON())
    .pipe(fs.createWriteStream('./file2.txt'));

/*
server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);
*/