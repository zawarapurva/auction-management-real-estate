'use strict';

const bcrypt = require('bcrypt');
const users = require('./Models/users');
const isExistingUser = require('./auth').isExistingUser;
const verifyCredentials = require('./verify').verifyCredentials;
const Boom = require('@hapi/boom');

module.exports = [
    {
        //register user
        method: 'POST',
        path: '/register',
        handler: async (request, h) => {

                    const password = await bcrypt.hash(request.payload.password,10);
                    const existingUser = await isExistingUser(request.payload.email, request.payload.username);
                    console.log(existingUser);
                    if (!existingUser) {
                        const user = new users({
                            firstname: request.payload.firstname,
                            lastname: request.payload.lastname,
                            username: request.payload.username,
                            password: password,
                            email: request.payload.email,
                            businesstype: request.payload.businesstype,
                            profile: request.payload.profile,
                        });
                        // console.log(request.payload);
                        await user.save(user);
                        return h.response({
                            message : 'Registered'
                        }).code(200);
                    }
                    return h.response({
                        message: 'User already exist'
                    }).code(400);
                }
    },

    {
        method: 'POST',
        path: '/login',
        handler: async (request) => {
                const verifiedUser = await verifyCredentials(request);
                console.log(verifiedUser);
                if (verifiedUser.code !== 400) {
                    //issue jwt
                    return "login successful"
                }
                else return verifiedUser;
            }
    }

]
