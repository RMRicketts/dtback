'use strict'
const Glue = require('@hapi/glue');
const Manifest = require('./manifest');

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

const init = async () => {
  
  const options = { relativeTo: __dirname }
  const server = Manifest.get('/', options)
  
  await server.start();

  console.log('Server is running on %s',server.info.uri);
}

init();
