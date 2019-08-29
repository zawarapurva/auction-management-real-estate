const Hapi = require('@hapi/hapi');
const db = require('./database').db;
const routes = require('./routes');
const config = require('./config')

const init = async () => {
 
    const server = new Hapi.server({ port: 5000 });

    server.route({
      method: 'POST',
      path: '/',
      handler: function (_request, _h) {
          return 'Auctions Home';
      }
  });

  server.route(routes);

  const start = async function () {
    try {
      await server.register({
        plugin: require('hapi-cors'),
        options: {
          origins: ['http://localhost:4200','*']
        }
      });
      await server.start();
      console.log('Server running on %s', server.info.uri);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };

  start();
};

init();