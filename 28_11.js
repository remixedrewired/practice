let fetch = require('node-fetch');
function createArrayWithUrls (numberOfposts) {
    var root = 'https://jsonplaceholder.typicode.com';
    var array = [];
    for(i = 1; i <=numberOfposts; i++) {
        array.push(root + `/posts/${i}`); 
    }
    return array;
}  

let arrayOfUrls = createArrayWithUrls(10);
const final = [];
let arrayPer5 = [];
let counter = 0;

// вот тут хз, как вернуть функцию 
function myFetch(item){
    return fetch(item)
         .then(result => result.json()).then(result => final.push(result.id));
        
}
function workMyCollection(arr) {
    return arr.reduce((promise, item) => {
        return promise
                .then(() => {
                    if(arrayPer5.length !== 5) {
                        arrayPer5.push(myFetch(item));
                        console.log(arrayPer5);
                        return Promise.resolve();
                    } else {
                        return promise.then(() => Promise.all(arrayPer5)).then(() => {
                            arrayPer5 = [];
                            counter = 0;
                        })
                    }
                })  
                .catch(console.error)
    }, Promise.resolve())
} 
 
  workMyCollection(arrayOfUrls)
    .then(() => console.log(final));
 
