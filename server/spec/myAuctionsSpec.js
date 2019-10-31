'use strict';

const testdb = require('../spec/testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');
const auctions = require('../Models/auctions');
const buyers = require('../Models/buyers');

const request2 = {
    payload: {
        email: "baymax@gmail.com",
        password: "12345678",
        username: "bay",
        firstname: "bay",
        lastname: "max",
        businesstype: "Dealer"
    }
};

const userId = users.find({ username: "bay" }, { _id: 1 });

const request = {
    payload: {
        seller_id: userId,
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

const request1 = {
    payload: {
        seller_id: userId,
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

describe('check my Auctions fetch', () => {

    let server;

    beforeAll(async () => {
        server = await init();
        await testdb.createCollection("users");
        await testdb.createCollection("auctions");
        const user1 = await controller.register(request2);
        await controller.createAuction(request);
        await controller.createAuction(request1);
    });

    it('should give the auctions created by the user when given the user_id ', async () => {
        console.log("====user", userId);
        const response = await server.inject({
            method: 'get',
            url: '/myAuctions',
            query: {
                user_id: userId
            }
        });
        console.log(response);
        expect(response.statusCode).toEqual(200);
    });

    afterAll(async () => {
        await testdb.collection("users").drop();
        await testdb.collection("auctions").drop();
        await server.stop();
    });
});