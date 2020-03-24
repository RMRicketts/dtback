"use strict";

module.exports.goodbyeWorld = {
  method: 'GET',
  path: '/goodbye',
  options: {
    pre: [require('../../modules/auth/auth.js')],
  },
  handler: (request, h) => {
    return 'Goodbye World!';
  },
};
