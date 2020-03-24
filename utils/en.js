const crypto = require('crypto');
const {dtbackDefaultSalt} = require('../../configs/config.js');

module.exports.hash = (payload, secret) => {
  const hash = crypto
    .createHmac('sha3-512', secret + dtbackDefaulSalt)
    .update(payload)
    .digest('hex');
  return hash;
};

module.exports.encrypt = (payload, secret, salt) => {
  const alg = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, salt, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(alg, key, iv);

  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  encrypted = iv.toString('hex') + ':' + encrypted;

  return encrypted;
};
