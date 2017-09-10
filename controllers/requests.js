'use strict';

let express = require('express');
let router = express.Router();

let db = require('../db');
let requestsModel = require('../models/requests')

router.get('/', (req,res) => {
    let collection = db.get().collection('requests');
    let ip = req.connection.remoteAddress;
    let date = Date.now();
    let message =  {ip: ip, date: date};

    requestsModel.append(message);

    requestsModel.topTen(function(err,docs) {
        res.render('requests', {data: docs} );
    });

});

module.exports = router;

