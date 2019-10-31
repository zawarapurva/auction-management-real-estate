'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const Inert = require('inert');

const server = Hapi.server({
    port: 5000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (_request, _h) {
        return 'Auctions Home';
    }
});
server.register(Inert);
server.route(routes);

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});