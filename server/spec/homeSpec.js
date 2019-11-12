'use strict';

const testdb = require('./testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');
const auctions = require('../Models/auctions');

const request4 = {
    payload: {
        email: "baymax@rediff.com",
        password: "123456",
        username: "max",
        firstname: "max",
        lastname: "bay",
        businesstype: "Broker"
    }
};

const request5 = {
    payload: {
        email: "baymax@gmail.com",
        password: "12345678",
        username: "bay",
        firstname: "bay",
        lastname: "max",
        businesstype: "Dealer"
    }
};

const request = {
    payload: {
        seller_id: 1,
        title: "Castle",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        max_current_bid: 1200,
        expiry_date: "2019-09-30",
        property_image: [137, 80, 78, 71, 13, 10, 26, 10],
        property_image_type: "image/png",
        image_name: "2019-10-15T07:12:35.437Z.png",
        winner: null
    }
};

const request3 = {
    payload: {
        seller_id: 1,
        title: "Mansion",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        max_current_bid: 1200,
        expiry_date: "2019-09-30",
        property_image: [137, 80, 78, 71, 13, 10, 26, 10],
        property_image_type: "image/jpeg",
        image_name: "2019-10-15T07:12:35.437Z.jpeg",
        winner: "bay"
    }
};

describe('Check auction fetch and bid functionality', () => {
    let server;

    beforeAll(async () => {
        server = await init();
        await testdb.createCollection("users");
        await testdb.createCollection("auctions");
        await testdb.createCollection("buyers");
        await controller.createAuction(request);
        await controller.createAuction(request3);
        await controller.register(request4);
        await controller.register(request5);
    });

    it('it should be able to fetch the auction and return code 200', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/home'
        });
        expect(response.statusCode).toEqual(200);
    });

    it("should be able to bid on a specific auction when given auction id", async () => {
        const buyerId1 = await users.find({ username: "max" }, { _id: 1 });
        const auctionId1 = await auctions.find({ title: "Castle" }, { _id: 1 });
        const response = await server.inject({
            method: 'POST',
            url: '/home',
            payload: {
                bid_value: 1300,
                buyer_id: buyerId1,
                auction_id: auctionId1
            }
        });
        expect(response.statusCode).toEqual(200);
    });

    it("should be able to give error for bid value less than or equal to the current max bid", async () => {
        const buyerId2 = await users.find({ username: "bay" }, { _id: 1 });
        const auctionId1 = await auctions.find({ title: "Castle" }, { _id: 1 });
        const response = await server.inject({
            method: 'POST',
            url: '/home',
            payload: {
                bid_value: 1200,
                buyer_id: buyerId2,
                auction_id: auctionId1
            }
        });
        expect(response.statusCode).toEqual(400);
    });

    afterAll(async () => {
        await testdb.collection("users").drop();
        await testdb.collection("auctions").drop();
        await testdb.collection("buyers").drop();
        await server.stop();
    });
});
