const testdb = require('./testdb').testdb;
const controller = require('../api/controller');

const auction =  {
    payload: {
        seller_id: 1,
        title: "Castle",
        property_type: "Residential",
        address: "2300, Elliott Avenue, Apt 207, Seattle, WA- 98121",
        description: "4 Bedrooms, 2 Full Baths, 1500 Sq.Ft. Built in 1984, Other Heat 0.81 Acres Lot, Located on a corner lot.",
        min_starting_bid: 1000,
        bid_value_multiple: 100,
        expiry_date: "2019-09-30"
    }
};

  describe("check Create Auction functonality", () => {

    beforeAll( async() => {
      await testdb.createCollection("auctions");
    });

    it("should be able to save auction to the test database and return code 200", async() => {
      const auction1 = await controller.createAuction(auction);
      expect(auction1.code).toEqual(200);
    });

    afterAll( async() => {
      await testdb.collection("auctions").drop();
    });
   
});