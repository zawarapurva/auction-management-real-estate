'use strict';

const testdb = require('../spec/testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');
const auctions = require('../Models/auctions');

const request = {
    payload: {
        email: "bay@gmail.com",
        password: "12345678",
        username: "bay",
        firstname: "bay",
        lastname: "max",
        businesstype: "Dealer"
    }
};

let request1 = {
    payload: {
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

const request2 = {
    payload: {
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

describe('check View Bids', () => {

    let server;
    let userId1;
    let auction1;
    let auction2;
    let request3;
    let request4;

    beforeEach(async () => {
        server = await init();
        await testdb.createCollection("users");
        await testdb.createCollection("auctions");
        await testdb.createCollection("buyers");
        await controller.register(request);
        await controller.createAuction(request1);
        await controller.createAuction(request2);
        userId1 = await users.find({ username: "bay" }, { _id: 1 });
        auction1 = await auctions.find({ title: "Castle" }, { _id: 1 });
        auction2 = await auctions.find({ title: "Mansion" }, { _id: 1 });
        request3 = {
            payload: {
                bid_value: 1300,
                buyer_id: userId1[0].id,
                auction_id: auction1[0].id
            }
        };
        request4 = {
            payload: {
                bid_value: 1300,
                buyer_id: userId1[0].id,
                auction_id: auction2[0].id
            }
        };
    });

    it('should be able to fetch auctions user has bid on when given the user_id', async () => {
        await controller.bid(request3);
        await controller.bid(request4);
        const response = await server.inject({
            method: 'GET',
            url: '/myBids?user_id=' + userId1[0].id
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should give an error when there are no bids to display, on when given the user_id', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/myBids?user_id=' + userId1[0].id
        });
        expect(response.statusCode).toEqual(400);
    });

    afterEach(async () => {
        await testdb.collection("users").drop();
        await testdb.collection("auctions").drop();
        await testdb.collection("buyers").drop();
        await server.stop();
    });
});