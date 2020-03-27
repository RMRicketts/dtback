'use strict';
const _ = require('lodash');
const Boom = require('@hapi/boom');
const hash = require('../../utils/en.js').hash;

module.exports.createAccount = {
  method: 'POST',
  path: '/api/v1/account/{accountName}/create',
  options: {
    pre: [require('../../modules/accounts/account.js')],
  },
  handler: async (request, h) => {
    let {accounts} = request.server.app;
    let {params, payload} = request;
    let bdy = _.merge(params, payload);
    bdy._id = params.accountName;
    try {
      await accounts.insert(bdy);
    } catch (e) {
      console.log(e);
      return Boom.badImplementation();
    }
    return {success: true};
  },
};

module.exports.createAccountMember = {
  method: 'POST',
  path: '/api/v1/account/{accountName}/addMember/{userName}',
  options: {
    pre: [require('../../modules/accounts/member.js')],
  },
  handler: async (request, h) => {
    let {accountMembers} = request.server.app;
    let {payload, params} = request;
    let bdy = _.merge(payload, params);
    bdy._id = params.userName;
    bdy.created = new Date();
    let salt = bdy.userName + bdy.created.toString() + bdy.accountName;
    bdy.pw = hash(dby.pw, salt);
    try {
      await accountMembers.insert(bdy);
    } catch (e) {
      console.log(e);
      return Boom.badImplementation();
    }
    return {success: true};
  },
};

module.exports.createEmployee = {
  method: 'POST',
  path: '/api/v1/employees/add/{userName}',
  options: {
    pre: [require('../../modules/accounts/employee.js')],
  },
  handler: async (request, h) => {
    let {employees} = request.server.app;
    let {params, payload} = request;
    let bdy = _.merge(params, payload);
    bdy.created = new Date();
    let salt = bdy.userName + bdy.created.toString();
    bdy.pw = hash(bdy.pw, salt);
    try {
      await employees.insert(bdy);
    } catch (e) {
      return Boom.badImplementation();
    }
    return {success: true};
  },
};
