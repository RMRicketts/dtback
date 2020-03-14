'use strict';

const Hapi = require('@hapi/hapi');
const actions = require('./actions');

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

const init = async () => {
  const options = {port: 3000, host: 'localhost'};

  const server = Hapi.server(options);

  await actions(server)

  await server.start();

  console.log('Server is running on %s', server.info.uri);
};

init();
