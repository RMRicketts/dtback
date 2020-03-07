const _ = require('lodash');
const dispatch = require('./dispatch.js');
const data = require('./data.js');


let merged = _.merge(dispatch, data);

module.exports = (server) => {
  for(let i of Object.keys(merged)){
    server.route(merged[i])
  }
}
