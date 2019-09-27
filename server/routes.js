'use strict';
const controller = require('./api/controller');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: async (request, h) => {
           return controller.register(request, h);
    }
},

    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            return controller.login(request, h);
        }
    },

    {
        method: 'POST',
        path: '/createAuction',
        handler: async (request, h) => {
            return controller.createAuction(request, h);
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
