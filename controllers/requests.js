'use strict';

let express = require('express');
let router = express.Router();
let Address6 = require('ip-address').Address6;

let db = require('../db');
let requestsModel = require('../models/requests')

router.get('/', (req,res) => {
    let collection = db.get().collection('requests');
    let ip = req.connection.remoteAddress;

    let currentdate = new Date(); 

    let clientAddress = new Address6(ip);                    
    let client_ip = clientAddress.to4().correctForm();

    let message =  {ip: client_ip, date: currentdate.toISOString()};

    requestsModel.append(message);

    requestsModel.topTen(function(err,docs) {
        res.render('requests', {data: docs} );
    });

});

module.exports = router;

