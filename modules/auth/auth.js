const Boom = require('@hapi/boom');
const jwt = require('../../utils/jwt.js');

module.exports = {
  assign: 'authProfile',
  method: async (req, h) => {
    let accessToken;
    try {
      accessToken = req.headers.Authorization.split(' ')[0];
    } catch (e) {
      return Boom.unauthorized('Invalid Token');
    }
    let payload;
    try {
      payload = jwt.verify(payload);
    } catch (e) {
      if (e.message === 'jwt expired') {
        let error = Boom.unathorized('Access token expired');
        error.output.payload.code = 'ACCESS_EXPIRED';
        return error;
      }
      return Boom.unauthorized('Invalid Access Token');
    }
    return payload;
  },
};
