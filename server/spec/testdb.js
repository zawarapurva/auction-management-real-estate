require('dotenv').config()

var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/'+process.env.TESTDB, {useNewUrlParser: true});
var testdb = Mongoose.connection;

testdb.on('error', console.error.bind(console, 'connection error'));
testdb.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

exports.testdb = testdb;