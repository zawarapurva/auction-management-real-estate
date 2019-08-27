const Hapi = require('@hapi/hapi');
const db = require('./database').db;
const routes = require('./routes');
const config = require('./config')

const init = async () => {
 
    const server = new Hapi.server({ port: 5000 });

    server.route({
      method: 'GET',
      path: '/',
      handler: function (_request, _h) {
          return 'Auctions Home';
      }
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();