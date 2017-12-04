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
      this.emit('error', new Error('Only UTF-8 sources are supported (1st transform)'));
      return callback();
    }
    chunk = chunk.split("\n");
    let counter = 0;
    while(counter < chunk.length - 1) {
      this.push(JSON.stringify(chunk[counter]));
      counter++;
    }
    callback();
  }
}
class StringToJSON extends stream.Transform {
  constructor(options = {}) {
    super(options);
    this.headers;
    this.firstItem;
  }

  _transform(chunk, encoding, callback) {
    chunk = JSON.parse(chunk);   
    if(!this.headers){
      this.headers = chunk.split(",");
      this.push('[');
    } else {
      let tmp = {};
      let row = chunk.split(",");
      for(let i = 0; i < this.headers.length; i++){
          tmp[this.headers[i]] = row[i];
      } 
      if(!this.firstItem) {
        this.push(JSON.stringify(tmp));
        this.firstItem = true;
      } else {
        this.push(',' + JSON.stringify(tmp))
      }  
    }
    callback();
    
  }

  _flush() {
    this.push(']');
  }
}

fs.createReadStream('books.csv', 'utf8')
  .pipe(new CsvToStrings())
  .pipe(new StringToJSON())
  .pipe(fs.createWriteStream('books.json'));