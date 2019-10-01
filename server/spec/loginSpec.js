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
    email: "baymax@gmail.com",
    password: "12345678",
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

describe("check user Login", () => {

    beforeAll( async() => {
      await testdb.createCollection("users");
      const user1 = await controller.register(request1);
    });

    it("should be able to login for correct email and password and return code 200 for successful login", async () => {
        const user = await controller.login(request1);
        expect(user.code).toEqual(200);
      });

    it("should give an erorr for incorrect password", async() => {
        const user = await controller.login(request2);
        expect(user.code).toEqual(400);
    });

    it("should give an error if the user does not exists", async() =>{
      const user = await controller.login(request3);
      expect(user.code).toEqual(400);
    });

    afterAll( async() => {
      await testdb.collection("users").drop();
    });
   
});