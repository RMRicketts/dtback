'use strict';
const Boom = require('@hapi/boom');
const sign = require('../../utils/jwt.js').sign;
const hash = require('../../utils/en.js').hash;

module.exports.login = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => {
    let {accountMembers} = request.server.app;
    let {params} = request;
    let userProfile = await accountMembers.aggregate([
      {$match: {userName: request.userName}},
      {$lookup: {from: 'accounts', localField: '$accountName', foreignField: '$accountName', as: 'accountProfile'}},
      {$project: {userName: 1, created: 1, accountName: 1, _id: 0}},
      {$limit: 1},
    ]);
    if (userProfile.length === 0) {
      Boom.unathorized('Invalid login');
    }
    userProfile = userProfile[0];
    let salt = userProfile.userName + userProfile.created.toString() + userProfile.accountName;
    userProfile = accountMembers
      .findOne({userName: request.userName, pw: hash(params.pw, salt)})
      .project({userName: 1, accountName: 1, roles: 1});
    if (userProfile === null) {
      Boom.unauthorized('Invalid login');
    }
    const token = sign(userProfile);
    return token;
  },
};
