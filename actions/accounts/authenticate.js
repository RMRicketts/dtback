"use strict";
const Boom = require("@hapi/boom");
const sign = require("../../utils/jwt.js").sign;
const hash = require("../../utils/en.js").hash;

module.exports.login = {
  method: "POST",
  path: "/api/v1/login",
  handler: async (request, h) => {
    let { accountMembers } = request.server.app;
    let { payload } = request;
    let userProfile = await accountMembers.aggregate([
      { $match: { userName: payload.userName } },
      {
        $lookup: {
          from: "accounts",
          localField: "$accountName",
          foreignField: "$accountName",
          as: "accountProfile"
        }
      },
      { $project: { userName: 1, created: 1, accountName: 1, _id: 0 } },
      { $limit: 1 }
    ]);
    if (userProfile.length === 0) {
      Boom.unathorized("Invalid login");
    }
    userProfile = userProfile[0];
    let salt =
      userProfile.userName +
      userProfile.created.toString() +
      userProfile.accountName;
    userProfile = await accountMembers
      .findOne({ userName: payload.userName, pw: hash(payload.pw, salt) })
      .project({ userName: 1, accountName: 1, roles: 1 });
    if (userProfile === null) {
      Boom.unauthorized("Invalid login");
    }
    const token = sign(userProfile);
    return token;
  }
};

module.exports.auth = {
  method: "POST",
  path: "/api/v1/auth",
  handler: async (request, h) => {
    let { employees } = request.server.app;
    let { payload } = request;
    let salt = bdy.userName + bdy.accountName + bdy.created.toString();
    let profile = await employees
      .findOne({ userName: payload.userName })
      .project({ userName: 1, created: 1, accountName: 1, _id: 0 });
    if (userProfile.length === 0) {
      Boom.unathorized("Invalid login");
    }
    profile = userProfile[0];
    let salt = userProfile.userName + userProfile.created.toString();
    profile = await employees
      .findOne({ userName: payload.userName, pw: hash(payload.pw, salt) })
      .project({ userName: 1, accountName: 1, roles: 1, _id: 1 });
    if (userProfile === null) {
      Boom.unauthorized("Invalid login");
    }
    const token = sign(userProfile);
    return token;
  }
};

module.exports.oauth = {
  method: "POST",
  path: "/api/v1/oauth",
  handler: async (request, h) => {
    let { employees } = request.server.app;
    let { payload } = request;
  }
};
