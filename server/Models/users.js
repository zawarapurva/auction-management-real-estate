var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required:true },
    jwt: {type: String },
    designation: {type: String, required:true },
    address : {type: String, required:true },
    my_auctions: ObjectId,
    my_bids: ObjectId,
});

module.exports = mongoose.model('users', usersSchema);