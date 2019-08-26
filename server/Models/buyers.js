var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyersSchema = new Schema({
    auction_id: ObjectId,
    buyer_id: ObjectId,
    bid_value: { type: Number, required: true },
    auction_status: { type: String, required: true},
});

module.exports = mongoose.model('buyers', buyersSchema);