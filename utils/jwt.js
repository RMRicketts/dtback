const jwt = require('jsonwebtoken');
const {dtbackDefaultSalt, dtbackDefaultSecret, dtbackPK} = require('../../configs/config.js');
const en = require('./en.js').encrypt;
const de = require('./de.js').decrypt;

module.exports.sign = payload => {
  let pkg = {data: en(JSON.stringify(payload), dtbackDefaultSecret, dbackDefaultSalt)};
  return jwt.sign(pkg, dtbackPK, {expiresIn: 60 * 60});
};

module.exports.verify = payload => {
  payload = JSON.parse(payload);
  let pkg = jwt.verify(payload, dtbackPK);
  return JSON.parse(decrypt(pkg.data, dtbackDefaultSecret, dtbackDefaultSalt));
};
