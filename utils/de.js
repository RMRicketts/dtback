const crypto = require('crypto');

module.exports.decrypt = (payload, secret, salt) => {
  const alg = 'aes-256-cbc';
  const iv = new Buffer.from(payload.split(':')[0], 'hex');
  const encrypted = payload.split(':')[1];
  const key = crypto.scryptSync(secret, salt, 32);
  const decipher = crypto.createDecipheriv(alg, key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
