'use strict';

const testdb = require('../spec/testdb').testdb;
const controller = require('../api/controller');
const { init } = require('../server');

const users = require('../Models/users');

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

describe('check profile', () => {

    let server;
    let userId1;

    beforeAll(async () => {
        server = await init();
        await testdb.createCollection("users");
        await controller.register(request1);
        userId1 = await users.find({ username: "bay" }, { _id: 1 });
    });

    it('should be able to get user profile when given user_id', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/profile?user_id=' + userId1[0].id
        });
        expect(response.statusCode).toEqual(200);
    });

    afterAll(async () => {
        await testdb.collection("users").drop();
        await server.stop();
    });
});