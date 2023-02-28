const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/game-survey', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.fav_game);
    res.send('Thanks for submitting!');
});

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side...');
// });

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);