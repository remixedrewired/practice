const stream = require('stream');
const fs = require('fs');

class CsvToStrings extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false
    });
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));
      return callback();
    }
    chunk = chunk.split("\n");
    let headers = chunk.shift().split(",");
    let json = [];  
      
    chunk.forEach(function(d){
        let tmp = {}
        let row = d.split(",")
        for(let i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
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