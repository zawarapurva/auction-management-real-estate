'use strict';

const buyers = require('../Models/buyers');
const auctions = require('../Models/auctions');

const bidValidator = async(bidValue, auction_id, buyer_id) => {
    const currentMaxBid = await buyers.find({auction_id}, {bid_value: 1, _id:0})
    .sort({bid_value:-1})
    .limit(1).lean();
    console.log(currentMaxBid);
    if(currentMaxBid.length<=0 || bidValue > currentMaxBid[0].bid_value)
    {
        const buyer = await buyers.findOneAndUpdate(
            {auction_id: auction_id, buyer_id: buyer_id},
            {$set: {bid_value: bidValue}},
            {upsert: true, new: true}).lean();
        const auction = await auctions.findOneAndUpdate(
            {_id: auction_id},
            {$set: {max_current_bid: bidValue}},
            {upsert: true, new: true}).lean();
        return null;
    }
    else {
        return currentMaxBid[0].bid_value;
    }
}

module.exports = {
    bidValidator: bidValidator
}