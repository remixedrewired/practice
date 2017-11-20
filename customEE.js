const EventEmitter = require('events').EventEmitter;

class customEE extends EventEmitter {
    constructor() {
        super();
        this.messages = [];
        this.initiate();
       
    }
    initiate(){
        this.on('add_new_message',(message) => {
            this.messages.push(message);
            console.log(message);
            if(this.messages.length > 5) {
                this.emit('error', {error: 'Buffer is full'})        
            }
        }); 
        this.on('delete_message',(messageNumber) => {
            if (messageNumber > this.messages.length) {
                this.emit('error', {error: 'There is no such index of message :('})
            } else {
                this.messages.splice(messageNumber - 1, 1);
            }
        });
        this.on('get_all',() => {
            console.log(this.messages);
        });
        this.on('error',(err) => {
            console.log(err);
        });
    }

    sendMessage(message){
       this.emit('add_new_message', message);
    }
    deleteMessage(messageNumber){
       this.emit('delete_message', messageNumber);        
    }
    getAllMessages(){
       this.emit('get_all');
    }
    
}
let user1 = new customEE();

user1.sendMessage('a');
user1.sendMessage('b');
user1.sendMessage('c');
user1.sendMessage('b');
user1.sendMessage('c');
user1.deleteMessage(7);
user1.getAllMessages();

