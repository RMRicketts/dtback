'use strict';
const Boom = require('@hapi/boom');
const Promise = require('bluebird');
const _ = require('lodash');

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
    let {params, query} = request;
    let crit = {
      schedDate: {$lte: new Date(params.fromDate), $gte: new Date(params.toDate)},
      locationId: {$in: params.locations.split('/')},
    };
    for (let key of Object.keys(query)) {
      if (typeof query[key] === 'string' || typeof query[key] === 'number') {
        crit[key] = query[key];
      }
      if (typeof query[key] === 'object') {
        let arr = JSON.parse(query([key]));
        if (Array.isArray(arr)) {
          crit[key] = {$in: arr};
        }
      }
    }
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
  handler: async (request, h) => {
    let {authProfile} = request.pre;
    if (authProfile.roles.indexOf('dispatch') === -1) {
      return Boom.unauthorized('go fuck yaself');
    }
    let {payload} = request;
    let {wos} = request.server.app;
    try {
      await Promise.mapSeries(payload.updates, update => {
        wos.updateOne({_id: update._id}, {$set: {...update.updates}});
      });
    } catch (e) {
      return Boom.badImplementation('Internal Error, Could not update wos');
    }

    return {success: true};
  },
};
