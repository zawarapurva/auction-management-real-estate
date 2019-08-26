var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionsSchema = new Schema({
    seller_id: ObjectId,
    description: { 
        area: { type: Number, required: true },
        property_address: { type: String, required: true},
        currency_type: { type: String, required: true },
        property_type: { type: String, required: true },
    },
    min_starting_bid: { type: Number, required: true },
    max_current_bid: { type: Number, required: true },
    bid_value_multiple: { type: Number, required: true },
    auction_type: { type: String, required: true },
    closing_date: { type: Date, required: true}
});

module.exports = mongoose.model('auctions', auctionsSchema);