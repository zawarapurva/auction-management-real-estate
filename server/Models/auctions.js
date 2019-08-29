var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Blob = mongoose.Schema.Types.Blob;
var ObjectId = mongoose.Schema.Types.ObjectId;

const auctionsSchema = new Schema({
    seller_id: ObjectId,
    description: { 
        image: {type: Blob, required: true},
        area: { type: Number, required: true },
        property_address: { type: String, required: true},
        currency_type: { type: String, required: true },
    },
    min_starting_bid: { type: Number, required: true },
    max_current_bid: { type: Number, required: true },
    bid_value_multiple: { type: Number, required: true },
    property_type: { type: String, required: true },
    auction_type: { type: String, required: true },
    closing_date: { type: Date, required: true}
});

module.exports = mongoose.model('auctions', auctionsSchema);