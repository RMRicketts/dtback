"use strict";

module.exports.Reserve = {
  method: 'GET',
  path: '/api/v1/stuff/{name}/{superName?}',
  handler: async (request, h) => {
    let {app} = request.server;
    let {params} = request;
    return `The name ${name} is a super Name ${superName}`;
  },
};
