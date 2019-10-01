var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new Schema({
    firstname: { type: String,required: true  },
    lastname: { type: String, required: true  },
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: {type: String, required:true },
    jwt: {type: String },
    businesstype: {type: String, required: true },
    address : {type: String },
    my_auctions: ObjectId,
    my_bids: ObjectId,
});

module.exports = mongoose.model('users', usersSchema);