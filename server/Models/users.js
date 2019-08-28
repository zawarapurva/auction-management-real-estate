var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new Schema({
    firstname: { type: String  },
    lastname: { type: String  },
    username: { type: String },
    password: {type: String, required:true },
    email: { type: String, required: true},
    jwt: {type: String },
    businesstype: {type: String },
    address : {type: String },
    my_auctions: ObjectId,
    my_bids: ObjectId,
});

module.exports = mongoose.model('users', usersSchema);