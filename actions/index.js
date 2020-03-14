const _ = require('lodash');
const fs = require('fs').promises;
const path = require('path');
const dispatch = require('./dispatch.js');
const data = require('./data.js');

module.exports = async server => {
  //  let merged = _.merge(dispatch, data);
  let merged = await test();
  console.log(merged);
  for (let i of Object.keys(merged)) {
    server.route(merged[i]);
  }
};

let test = async (merge, filePath) => {
  merge = merge === undefined ? {} : merge;
  filePath = filePath === undefined ? __dirname : filePath;
  console.log(filePath);
  try {
    let dir = await fs.opendir(filePath);
    for await (let dirent of dir) {
      if (dirent.isDirectory()) {
        merge = await test(merge, path.join(filePath, dirent.name));
      }
      if (dirent.isFile() && dirent.name.substr(dirent.name.length - 3, 3) === '.js') {
        let m = require(path.join(filePath, dirent.name));
        merge = _.merge(merge, m);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return merge;
};

test();
