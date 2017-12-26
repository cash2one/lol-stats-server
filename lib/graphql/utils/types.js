const glob = require("glob");
const path = require("path");

function getTypeAsString(filePath) {
  return require(path.resolve(filePath));
}

const types = glob
  .sync("**lib/graphql/types/**/*-type.js")
  .map(getTypeAsString);

module.exports = types;
