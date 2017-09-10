'use strict';

let express = require('express');
let router = express.Router();
let dateFormat = require('dateformat');
let Address6 = require('ip-address').Address6;

let db = require('../db');
let requestsModel = require('../models/requests')

router.get('/', (req,res) => {
    let collection = db.get().collection('requests');
    let ip = req.connection.remoteAddress;

    let currentdate = new Date(); 
    let datetime = dateFormat(currentdate);

    let clientAddress = new Address6(ip);                    
    let client_ip = clientAddress.to4().correctForm();

    let message =  {ip: client_ip, date: datetime};

    requestsModel.append(message);

    requestsModel.topTen(function(err,docs) {
        res.render('requests', {data: docs} );
    });

});

module.exports = router;

