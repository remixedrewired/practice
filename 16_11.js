let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let fetch = require('node-fetch');

let arrayOfUrls = createArrayWithUrls(10);


function createArrayWithUrls (numberOfposts) {
    var root = 'https://jsonplaceholder.typicode.com';
    var array = [];
    for(i = 1; i <=numberOfposts; i++) {
        array.push(root + `/posts/${i}`); 
    }
    return array;
}  

//Promise.all(arrayOfUrls.map(fetch)).then(results => console.log(results));

const final = [];
function workMyCollection(arr) {
    return arr.reduce((promise, item) => promise
            .then((result) => {
                console.log(`item ${item}`);
                return fetch(item)
                        .then(result => result.json()).then(result => final.push(result.id));
            })
            .catch(console.error)
        , Promise.resolve()
    );
  }
 
  workMyCollection(arrayOfUrls)
    .then(() => console.log(final));
 

/*-
let chain = Promise.resolve();
let results = []

arrayOfUrls.forEach((url) => {
    chain = chain
    .then(() => fetch(url))
    .then(res => res.json())
    .then(res => results.push(res));
})

chain.then(() => {
    console.log(results);
  });
*/
/*
const url = 'https://jsonplaceholder.typicode.com/posts/';

function getPosts(postNumber) {
    return fetch(url + postNumber)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (postNumber > 9) return;
            return getPosts(postNumber + 1);
        });
}

getPosts(1);

*/