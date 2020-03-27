let joi = require('@hapi/joi');

module.exports = joi.object({
  addr_1: Joi.string(),
  addr_2: Joi.string(),
})
