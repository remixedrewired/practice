const fetch = require('node-fetch');

const url = 'https://jsonplaceholder.typicode.com/posts/';
let arrayPer5 = [];
let counter = 0;
let final = [];

function myFetch(url, postNumber){
    return fetch(url + postNumber)
            .then(result => result.json())
            .then(result => {
                final.push(result.id)
                console.log('done ' + result.id);
            });  
}

function getPosts(postNumber) {
   process.nextTick(() => {
        if(postNumber > 10) return console.log(final);
        arrayPer5.push(myFetch(url, postNumber));
        if(arrayPer5.length === 5) {
            return Promise.all(arrayPer5).then(() => {
                arrayPer5 = [];
                return setTimeout(() => getPosts(postNumber + 1), 500);
            });
        }
        return getPosts(postNumber + 1);
    })
}
getPosts(1)