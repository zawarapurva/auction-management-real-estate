require('dotenv').config()

var Mongoose = require('mongoose');
// console.log(process.env.DB);

    Mongoose.connect('mongodb://localhost/auctionDB', {useNewUrlParser: true});
    var db = Mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('Connection with database succeeded.');
    });

exports.db = db;