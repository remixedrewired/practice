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
    arrayPer5.push(myFetch(url, postNumber));
    if(arrayPer5.length < 5) {
        counter++;
        return getPosts(postNumber + 1);
    } else {
        return Promise.all(arrayPer5).then(() => {
            arrayPer5 = [];
            if(counter > 10) return;
            return setTimeout(() => {
                getPosts(postNumber + 1)
                }, 1000);
            })
    }
}

getPosts(1).then(() => console.log(final));