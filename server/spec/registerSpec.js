const testdb = require('./testdb').testdb;
const controller = require('./../api/controller');

const request1 = {
    payload: {
      email: "baymax@gmail.com",
      password: "123456",
      username: "baymax",
      firstname: "bay",
      lastname: "max",
      businesstype: "Broker"
    }
  };

const request2 = {
  payload: {
    email: "bay@gmail.com",
    password: "123456",
    username: "baymax",
    firstname: "bay",
    lastname: "max",
    businesstype: "Dealer"
  }
};

const request3 = {
  payload: {
    email: "bay@gmail.com",
    password: "123456",
    username: "max",
    firstname: "bay",
    lastname: "max",
    businesstype: "Dealer"
  }
};

describe("check user registration", () => {

    beforeAll( async() => {
      await testdb.createCollection("users");
    });

    it("should save user and return code 200 for registration successful", async () => {
        const log_code = await controller.register(request1);
        expect(log_code.code).toEqual(200);
      });

    it("should give an erorr if the username is already taken", async() => {
        const user1 = await controller.register(request1);
        const user2 = await controller.register(request2);
        expect(user2.code).toEqual(400);
    });

    it("should give an error if the email is already taken", async() =>{
      const user1 = await controller.register(request2);
      const user2 = await controller.register(request3);
      expect(user2.code).toEqual(400);
    });

    afterEach( async() => {
      await testdb.collection("users").drop();
    });
   
});