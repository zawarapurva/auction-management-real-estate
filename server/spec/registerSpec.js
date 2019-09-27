const testdb = require('./testdb').testdb;
const controller = require('./../api/controller');

const request = {
    payload: {
      email: "baymax@gmail.com",
      password: "123456",
      username: "baymax",
      firstname: "bay",
      lastname: "max",
      businesstype: "broker"
    }
  };

describe("check user register", () => {
    it("should save user and return code 200 for registration successful", async () => {
        const log_code = await controller.register(request, testdb);
        console.log(log_code);
        expect(log_code.code).toEqual(200);
      });

    // it("should give an erorr if the username is already taken", async() => {
        
    //     expect()
    // });

    // it("should give an error if the email is already taken", async() =>{

    // })
});