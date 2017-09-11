'use strict';

let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

let requests = require('./controllers/requests');
let db = require('./db');

app.use('/',requests);

const PORT = 3000;
const MONGODBURL = 'mongodb://arquitecturasoftware:12345678a@ds129374.mlab.com:29374/tarea1';

db.connect(MONGODBURL, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(PORT, () => console.log("Servidor creado"));
    }
});






