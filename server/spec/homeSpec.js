const testdb = require('./testdb').testdb;
const controller = require('../api/controller');

const request = {
    payload: {
        _id: 1,
        seller_id: 1,
        title: "Castle",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        max_current_bid: 1200,
        expiry_date: "2019-09-30",
        image_name: "2019-10-15T07:12:35.437Z.jpeg",
        winner: "null"
    }
};

const request3 = {
    payload: {
        _id: 2,
        seller_id: 1,
        title: "Castle",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        max_current_bid: 1200,
        expiry_date: "2019-09-30",
        image_name: "2019-10-15T07:12:35.437Z.jpeg",
        winner: "null"
    }
};

const request1 = {
    payload: {
        bid_value: 1300,
        buyer_id: 1,
        auction_id: 1
    }
}

const request2 = {
    payload: {
        bid_value: 1100,
        buyer_id: 2,
        auction_id: 2
    }
}

describe("Check auction fetch and bid functonality", () => {

    beforeAll(async () => {
        await testdb.createCollection("auctions");
        await testdb.createCollection("buyers");
        await controller.createAuction(request);
        await controller.createAuction(request3);
    });

    it("should be able to fetch the auction and return code 200", async () => {
        const auction1 = await controller.getAuctions(request);
        expect(auction1.code).toEqual(200);
    });

    it("should be able to bid on a specific auction when given auction id", async () => {
        const auction1 = await controller.bid(request1);
        expect(auction1.code).toEqual(200);
    });

    it("should be able to give error for bid value smaller than the current max bid", async () => {
        const auction1 = await controller.bid(request2);
        expect(auction1.code).toEqual(400);
    });

    it("should be able to give error for bid value smaller than the current max bid", async () => {
        const auction1 = await controller.getViewBids(request2);
        expect(auction1.code).toEqual(400);
    });
    
    // afterAll(async () => {
    //     await testdb.collection("auctions").drop();
    //     await testdb.collection("buyers").drop();
    // });

})
