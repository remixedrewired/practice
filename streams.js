const stream = require('stream');

class CsvToJSON extends stream.Transform {
  constructor(options = {}){
    super(options);
  }

  _transform(chunk, encoding, callback) {
    if(encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));
      return callback();
    }

    this.push();
    callback();
  }
}



