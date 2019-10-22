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
            return h.response({message:result.message,
            id: result.user_id}).code(result.code);
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
        path: '/propertyImg/{file*}',
        handler:{
            directory:{
                path:'./auction-management-for-real-estate/server/public/',
            }
        }
    },


    {
        method: 'GET',
        path: '/home',
        handler:  async (request, h) => {
            return controller.getAuctions(request, h);
        }
    },

    {
        method: 'POST',
        path: '/home',
        handler:  async (request, h) => {
            const result = await controller.bid(request);
            return h.response({
                currentMax: result.currentMax,
                message:result.message}).code(result.code);
        }
    },

    {
        method: 'GET',
        path: '/myAuctions',
        handler:  async (request, h) => {
            return controller.getMyAuctions(request, h);
        }
    },

    {
        method: 'GET',
        path: '/viewBids',
        handler:  async (request, h) => {
            return controller.getViewBids(request, h);
        }
    },

    {
        method: 'GET',
        path: '/profile',
        handler:  async (request, h) => {
            return controller.getProfile(request, h);
        }
    },

    {
        method: 'GET',
        path: '/myBids',
        handler:  async (request, h) => {
            return controller.getMyBids(request, h);
        }
    },

    {
        method: 'POST',
        path: '/winner',
        handler:  async (request, h) => {
            const result = await controller.setWinner(request);
            return h.response(result);
        }
    },

    {
        method: 'GET',
        path: '/search',
        handler:  async (request, h) => {
            return controller.getFilterSearch(request, h);
        }
    },

]