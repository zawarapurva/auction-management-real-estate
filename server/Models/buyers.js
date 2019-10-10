var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const buyersSchema = new Schema({
    auction_id: ObjectId,
    buyer_id: ObjectId,
    bid_value: { type: Number, required: true },
    auction_status: { type: String},
});

module.exports = mongoose.model('buyers', buyersSchema);