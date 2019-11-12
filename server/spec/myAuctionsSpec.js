'use strict';

const testdb = require('../spec/testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');
const auctions = require('../Models/auctions');

const request1 = {
    payload: {
        email: "bay@gmail.com",
        password: "12345678",
        username: "bay",
        firstname: "bay",
        lastname: "max",
        businesstype: "Dealer"
    }
};

const request2 = {
    payload: {
        email: "baymax@gmail.com",
        password: "123456",
        username: "baymax",
        firstname: "bay",
        lastname: "max",
        businesstype: "Broker"
    }
};

let request = {
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

describe('check my Auctions fetch', () => {

    let server;
    let userId1;
    let userId2;

    beforeAll(async () => {
        server = await init();
        await testdb.createCollection("users");
        await testdb.createCollection("auctions");
        await controller.register(request1);
        await controller.register(request2);
        userId1 = await users.find({ username: "bay" }, { _id: 1 });
        userId2 = await users.find({ username: "baymax" }, { _id: 1 });
        await controller.createAuction(request);
        const auction = await auctions.findOneAndUpdate(
            { title: "Castle" },
            { $set: { seller_id: userId1[0].id } },
            { upsert: true, new: true }).lean();
    });

    it('should give the auctions created by the user when given the user_id ', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/myAuctions?user_id=' + userId1[0].id
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should give an error when there is no auction to display', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/myAuctions?user_id=' + userId2[0].id
        });
        expect(response.statusCode).toEqual(400);
    });

    afterAll(async () => {
        await testdb.collection("users").drop();
        await testdb.collection("auctions").drop();
        await server.stop();
    });
});