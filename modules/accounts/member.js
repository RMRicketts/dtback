const Boom = require('@hapi/boom');

module.exports = {
  assign: 'accountMemberExists',
  method: async (req, h) => {
    let {accountMembers} = req.server.app;
    let {params} = req;
    let exists;
    try {
      exists = await accountMembers.findOne({accountName: params.accountName, userName: params.userName}).project({_id: 1});
    } catch (e) {
      return Boom.badImplementation('An internal server error occurred');
    }
    if (exists) {
      return Boom.conflict('User already exists');
    }
    return exists;
  },
};
