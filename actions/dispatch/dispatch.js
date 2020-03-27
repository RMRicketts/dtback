'use strict';
const Boom = require('@hapi/boom');
const Promise = require('bluebird');

module.exports.getWos = {
  method: 'GET',
  path: '/api/v1/dispatch/orders/{fromDate}/{toDate}/{locations*}',
  options: {
    pre: [require('../../modules/auth/auth.js')],
  },
  handler: (request, h) => {
    let {authProfile} = request.pre;
    if (authProfile.roles.indexOf('dispatch') === -1) {
      return Boom.unauthorized('go fuck yaself');
    }
    let {wos} = request.server.app;
    let {params} = request;
    let crit = {
      schedDate: {$lte: new Date(params.fromDate), $gte: new Date(params.toDate)},
      locationId: {$in: params.locations.split('/')},
    };
    let workOrders;
    try {
      workOrders = wos.find(crit).toArray();
    } catch (e) {
      return Boom.badImplementation(e);
    }
    return workOrders;
  },
};

module.exports.updateWos = {
  method: 'POST',
  path: '/api/v1/dispatch/orders/update',
  options: {
    pre: [require('../../modules/auth/auth.js')],
  },
  handler: (request, h) => {
    let {authProfile} = request.pre;
    if (authProfile.roles.indexOf('dispatch') === -1) {
      return Boom.unauthorized('go fuck yaself');
    }
    let {payload} = request;
    let {wos} = request.server.app;
    Promise.mapSeries(payload.updates, update => {
      wos.updateOne({_id: update._id}, {$set: {...update.setter}});
    });
  },
};
