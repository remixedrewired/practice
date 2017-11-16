var promiseCount = 0;

function testPromise(){
    var thisPromiseCount = ++promiseCount;
    console.log(thisPromiseCount + ': Started - Sync code started');

    var p1 = new Promise(function(resolve, reject){
        console.log(thisPromiseCount + ': Promise Started - Async code started');
        
        setTimeout(
            function(){
                resolve(thisPromiseCount);
            }, Math.random() * 2000 + 1000);
    
    });

    p1.then(function(val){
        console.log(val + ': Promise fulfilled - Async code terminated');
    }).catch(function(reason){
        console.log('Handle rejected promise ('+ reason +') here.');
    });
    console.log(thisPromiseCount + ':Promise made - Sync code terminated');
};





function applyForVisa(documents){
    console.log('Обработка заявления');
    let promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            Math.random() > .5 ? resolve({}): reject('В визе отказано');
        }, 2000);
    });

    return promise;
}
function getVisa(visa){
    console.log('Виза получена');
    return visa;
}

function bookHotel(visa){
    console.log(visa);
    console.log('Бронируем отель');
}
function buyTickets(){
    console.log('Покупаем билеты');
}


applyForVisa({})
    .then(getVisa)
    .then(bookHotel)
    .then(buyTickets)
    .catch(error => console.error(error));


