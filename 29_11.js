let fetch = require('node-fetch');
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
        if(postNumber > 10) return Promise.resolve().then(() => console.log(final));
        arrayPer5.push(myFetch(url, postNumber));
        if(arrayPer5.length === 5) {
            return Promise.all(arrayPer5).then(() => {
                arrayPer5 = [];
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(), 500);
                }).then(() => getPosts(postNumber + 1)); 
            })
        }
        return getPosts(postNumber + 1);
    })
}
getPosts(1)