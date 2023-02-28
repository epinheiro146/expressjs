const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

let submissions = [];

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/game-survey', (req, res) => {
    //console.log(req.body.name);
    //console.log(req.body.fav_game);

    submissions.push({
        "name": `${req.body.name}`,
        "fav_game": `${req.body.fav_game}`
    });

    fs.writeFile(path.join(__dirname, '../form-submissions.json'), JSON.stringify(submissions), err => {
        if (err) console.log(err);
    });

    res.send('Thanks for submitting!');
});

app.get('/formsubmissions', (req, res) => {
    const rawdata = fs.readFileSync(path.join(__dirname, '../form-submissions.json'));
    const data = JSON.parse(rawdata);
    res.json(data);
});

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side...');
// });

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);