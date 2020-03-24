"use strict";

module.exports.Reserve = {
  method: 'POST',
  path: '/name/{name?}',
  handler: async (request, h) => {
    let {app} = request.server;
    let {params} = request;
    return {success: true};
  },
};
