const stream = require('stream');
const fs = require('fs');

class CsvToStrings extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false
    });
    super(options);
    this.headers;
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));
      return callback();
    }
    chunk = chunk.split("\n");
    
    
    if(!this.headers){
      this.headers = chunk.shift().split(",");
    }
    console.log(this.headers);

    let json = [];  
    chunk.forEach(d => {
        let tmp = {};
        let row = d.split(",");
        for(let i = 0; i < this.headers.length; i++){
            tmp[this.headers[i]] = row[i];
        }
        json.push(tmp);
    });
    this.push(JSON.stringify(json));
    callback();
  }
}

fs.createReadStream('books.csv', 'utf8')
  .pipe(new CsvToStrings())
  .pipe(fs.createWriteStream('books.json'));