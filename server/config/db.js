'use strict';

var Mongoose = require('mongoose'),
  config = require('./config'),
  dbConfig = config.database;

//Mongoose.connect('mongodb://'+ dbConfig.username + ':' + dbConfig.password + '@' 
//  + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db);
//Keeping below comment for local testing
Mongoose.connect('mongodb://localhost:27017/hard-knocks');  
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
