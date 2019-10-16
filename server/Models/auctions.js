var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const auctionsSchema = new Schema({
    _id: ObjectId,
    seller_id: ObjectId,
    title: { type: String, required: true },
    property_type: { type: String, required: true },
    address: { type: String, required: true},
    description: {type: String, required: true },
    min_starting_bid: { type: Number, required: true },
    max_current_bid: { type: Number },
    bid_value_multiple: { type: Number, required: true },
    expiry_date: { type: String, required: true},
    image_name:{ type: String },
    winner: { type: String }
});

module.exports = mongoose.model('auctions', auctionsSchema);