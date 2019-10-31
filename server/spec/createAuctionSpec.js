'use strict';

const testdb = require('./testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');

const request1 = {
  payload: {
    email: "baymax@gmail.com",
    password: "12345678",
    username: "bay",
    firstname: "bay",
    lastname: "max",
    businesstype: "Dealer"
  }
};

describe("check Create Auction functonality", () => {
  let server;
  beforeAll(async () => {
    server = await init();
    await testdb.createCollection("auctions");
    await testdb.createCollection("users");
    await controller.register(request1);
  });

  it("should be able to save auction to the test database and return code 200", async () => {
    const sellerId1 = await users.find({ username: "bay" }, { _id: 1 });
    const response = await server.inject({
      method: 'POST',
      url: '/createAuction',
      payload: {
        seller_id: sellerId1,
        title: "Castle",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        expiry_date: "2019-09-30",
        property_image: [137, 80, 78, 71, 13, 10, 26, 10],
        property_image_type: "image/png"
      }
    });
    expect(response.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await testdb.collection("auctions").drop();
    await testdb.collection("users").drop();
    await server.stop();
  });

});