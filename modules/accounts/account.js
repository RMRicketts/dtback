const Boom = require('@hapi/boom');

module.exports = {
  assign: 'accountExists',
  method: async (req, h) => {
    let {accounts} = req.server.app;
    let {params} = req;
    let exists;
    try {
      exists = await accounts.findOne({accountName: params.accountName}).project({_id: 1});
    } catch (e) {
      return Boom.badImplementation('An internal server error occurred');
    }
    if (exists) {
      return Boom.conflict('Account already exists');
    }
    return exists;
  },
};
