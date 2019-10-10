'use strict';

const buyers = require('../Models/buyers');
const auctions = require('../Models/auctions');

const bidValidator = async(bidValue, auction_id) => {
    const currentMaxBid = await buyers.find({auction_id}, {bid_value: 1, _id:0})
    .sort({bid_value:-1})
    .limit(1).lean();
    console.log(currentMaxBid[0].bid_value);
    if(bidValue > currentMaxBid[0].bid_value)
    {
        const auction = await auctions.findOneAndUpdate(
            {_id: auction_id},
            {$set: {max_current_bid: bidValue}},
            {upsert: true, new: true}).lean();
            console.log(auction);
        return true;
    }
    else {return false;}
}

module.exports = {
    bidValidator: bidValidator
}