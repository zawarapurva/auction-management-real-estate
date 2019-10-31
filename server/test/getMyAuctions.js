'use strict';
const testdb = require('../spec/testdb').testdb;
const controller = require('../api/controller');
const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');

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

describe('GET /', () => {

    let server;

    beforeEach(async () => {
        server = await init();
        await testdb.createCollection("users");
        await testdb.createCollection("auctions");
        await testdb.createCollection("buyers");
        const user1 = await controller.register(request4);
        const user2 = await controller.register(request5);
        await controller.createAuction(request);
        await controller.createAuction(request3);
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/myAuctions',
        });
        console.log(res);
        expect(res.statusCode).to.equal(200);
    });
});