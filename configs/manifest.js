'use strict';
//const Confidence = require('confidence');
const Configs = require('./configs');
const Package = require('../package.json');

const criteria = {
  env: process.NODE_ENV
}

const manifest = {
  $meta: 'This is a thing that will do stuff',
  server: {
    debug: {
      request['error']
    },
    routes: {
      security: true
    }
  },
  register: {
    plugins: [
      {}
    ]
  }
}
