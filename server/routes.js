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
            const password = await bcrypt.hash(request.payload.password, 10);
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
                    message: 'Registered'
                }).code(200);
            }
            return h.response({
                message: existingUser.message
            }).code(existingUser.code);
        }
    },

    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const verifiedUser = await verifyCredentials(request.payload.email, request.payload.password);
            console.log(verifiedUser);
            if (typeof verifiedUser.code === 'undefined') {
                return h.response({
                    message: 'Login Successful'
                }).code(200);
            }
            return h.response({
                message: verifiedUser.message
            }).code(verifiedUser.code);
        }
    }

]
