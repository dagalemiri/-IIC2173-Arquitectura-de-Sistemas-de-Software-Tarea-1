'use strict';
let db = require('../db');
let dateFormat = require('dateformat');

module.exports.topTen = function(cb) {
    let collection = db.get().collection('requests');
    collection.find().sort({'date': -1}).limit(10).toArray(function (err,docs) {
        docs = docs.map( e => ({ip: e.ip, date: dateFormat(e.date) }));
        cb(err,docs);
    });
}

module.exports.append = function(message) {
    let collection = db.get().collection('requests');
    collection.insert(message, function(err, result){
    });
}


