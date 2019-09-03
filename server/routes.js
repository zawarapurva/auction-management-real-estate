'use strict';

const bcrypt = require('bcrypt');
const users = require('./Models/users');
const auctions = require('./Models/auctions');
const isExistingUser = require('./auth').isExistingUser;
const verifyCredentials = require('./verify').verifyCredentials;
const fs = require('fs');
const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./upload/test.png', file, err => {
         if (err) {
          reject(err)
         }
         resolve({ message: 'Upload successfully!' })
      })
    });
   }

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
                    // profile: request.payload.profile,
                });
                // console.log(request.payload);
                await user.save(user);
                return h.response({
                    message: 'Registered!!'
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
                    message: 'Login Successful!'
                }).code(200);
            }
            return h.response({
                message: verifiedUser.message
            }).code(verifiedUser.code);
        }
    },

    {
        method: 'POST',
        path: '/createAuction',
        handler: async(request, h) => {
            const auction = new auctions({
                title:request.payload.title,
                property_type: request.payload.property_type,
                address: request.payload.address,
                description: request.payload.description,
                min_starting_bid: request.payload.min_starting_bid,
                bid_value_multiple: request.payload.bid_value_multiple,
                expiry_date: request.payload.expiry_date,
                // property_image: request.payload.property_image
            });
            fs.writeFile('filename.png', BUFFER_DATA, err => {
                if (!err) {
                  console.log('Uploaded!')
                }
              });
            const { payload } = req;
            const response = handleFileUpload(payload.file);
            if (await auction.save(auction))
            {
                return response;
            }
            else{
                return h.response({
                    message: 'Error! check all fields'
                }).code(400);
            }
        }
    }
]
