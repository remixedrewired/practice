let fetch = require('node-fetch');


function createArrayWithUrls (numberOfposts) {
    var root = 'https://jsonplaceholder.typicode.com';
    var array = [];
    for(i = 1; i <= numberOfposts; i++) {
        array.push(root + `/posts/${i}`); 
    }
    return array;
}  

let arrayOfUrls = createArrayWithUrls(13);
const final = [];
let arrayPer5 = [];



function myFetch(item){
    console.log(item)
    return fetch(item)
         .then(result => result.json()).then(result => {
             final.push(result.id)
            console.log('done ' + result.id);
        });
        
}
function workMyCollection(arr) {
    return arr.reduce((promise, item, index) => {
        return promise
                .then(() => {
                    arrayPer5.push(myFetch(item));
                    if (arrayPer5.length === 5 || index === arr.length - 1) {
                        return promise.then(() => Promise.all(arrayPer5)).then(() => {
                            arrayPer5 = [];
                            return new Promise((res, rej) => {
                                setTimeout(() => {
                                    res()
                                }, 500);
                            })
                        })
                    }
                    
                })  
                .catch(console.error)
    }, Promise.resolve())
} 
 
workMyCollection(arrayOfUrls)
    .then(() => console.log(final));
 
