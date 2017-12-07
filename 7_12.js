const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/:id', (req, res, next) => {
    fetch('https://api.github.com/users/' + req.params.id)
        .then(result => {
            if(result['status'] == 200 && result['ok'] == true ) {
               return result.json()
            } else {
               res.sendStatus(418);
            }
        })
        .then(result => res.send(result))
        .catch(err => next(err));
})

app.listen(port, () => {
    console.log('server started');
});