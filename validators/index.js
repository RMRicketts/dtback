const _ = require('lodash');
const fs = require('fs').promises;
const path = require('path');

let getValidators = async (merge, filePath) => {
  try {
    let dir = await fs.opendir(filePath);
    for await (let dirent of dir) {
      let {name} = dirent;
      if (dirent.isDirectory()) {
        merge = await getValidators(merge, path.join(filePath, name));
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
  let merged = await getValidators({}, __dirname);
  for (let i of Object.keys(merged)) {
    server.route(merged[i]);
  }
};
