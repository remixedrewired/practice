var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fetch = require('node-fetch');

var arrayOfUrls = createArrayWithUrls(10);

function createArrayWithUrls (numberOfposts) {
    var root = 'https://jsonplaceholder.typicode.com';
    var array = [];
    for(i = 1; i <=numberOfposts; i++) {
        array.push(root + `/posts/${i}`); 
    }
    return array;
}  

//Promise.all(arrayOfUrls.map(fetch)).then(results => console.log(results));


let final = [];
  
function workMyCollection(arr) {
    return arr.reduce((promise, item) => promise
        .then((result) => {
            console.log(`item ${item}`);
            return fetch(item)
            .then((res)=> res.json()).then(result => final.push(result));
            })
        .catch(console.error)
    , Promise.resolve());
  }

  workMyCollection(arrayOfUrls)
    .then(() => console.log(final));
  










/*
function createArrayWithUrls1 (numberOfposts) {
    var root = 'https://jsonplaceholder.typicode.com';
    var array = [];
    for(i = 1; i <= numberOfposts; i++) {
        array.push(root + `/posts/${i}`); 
    }
}
createArrayWithUrls1(10)
    .then(array => console.log(array))
    .catch(error => console.log(error));
*/
