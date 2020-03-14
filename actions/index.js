const _ = require('lodash');
const fs = require('fs').promises;
const path = require('path');

let getActions = async (merge, filePath) => {
  merge = merge === undefined ? {} : merge;
  filePath = filePath === undefined ? __dirname : filePath;
  try {
    let dir = await fs.opendir(filePath);
    for await (let dirent of dir) {
      let {name} = dirent;
      if (dirent.isDirectory()) {
        merge = await getActions(merge, path.join(filePath, name));
      }
      if (dirent.isFile() && name.substr(name.length - 3, 3) === '.js') {
        let m = require(path.join(filePath, name));
        merge = _.merge(merge, m);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return merge;
};

module.exports = async server => {
  let merged = await getActions();
  for (let i of Object.keys(merged)) {
    server.route(merged[i]);
  }
};
