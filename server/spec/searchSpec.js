'use strict';

const testdb = require('./testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const request1 = {
    payload: {
        seller_id: 1,
        title: "Castle",
        property_type: "Commercial",
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
        seller_id: 2,
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

describe('Check Search functionality', () => {
    let server;

    beforeAll(async () => {
        server = await init();
        await testdb.createCollection("auctions");
        await controller.createAuction(request1);
        await controller.createAuction(request2);
    });

    it('it should be able to fetch the auctions according to the search filter', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/search?property_type=Residential'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('it should give an error if no auction exits of the given property_type', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/search?property_type=Industrial'
        });
        expect(response.statusCode).toEqual(400);
    });

    afterAll(async () => {
        await testdb.collection("auctions").drop();
        await server.stop();
    });
});
