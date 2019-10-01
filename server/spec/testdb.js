require('dotenv').config()

var Mongoose = require('mongoose');
console.log(process.env.testdb);
    Mongoose.connect('mongodb://localhost/testDB', {useNewUrlParser: true});
    var testdb = Mongoose.connection;
    
    testdb.on('error', console.error.bind(console, 'connection error'));
    testdb.once('open', function callback() {
        console.log('Connection with database succeeded.');
    });

exports.testdb = testdb;