'use strict';
const controller = require('./api/controller');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: async (request, h) => {
            const result = await controller.register(request);
            return h.response({message:result.message}).code(result.code);
    }
},

    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const result = await controller.login(request);
            return h.response({message:result.message}).code(result.code);
        }
    },

    {
        method: 'POST',
        path: '/createAuction',
        handler: async (request, h) => {
            const result = await controller.createAuction(request);
            return h.response({message:result.message}).code(result.code);
        }
    },

    {
        method: 'GET',
        path: '/home',
        handler:  async (request, h) => {
            return controller.home(request, h);
        }
    },

    {
        method: 'GET',
        path: '/propertyImg/{file*}',
        handler:{
            directory:{
                path:'./auction-management-for-real-estate/server/public/',
            }
        }
    }

]
