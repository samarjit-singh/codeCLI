const fs = require("fs");

function getCodeFromFile(file) {
  return fs.readFileSync(file, "utf-8");
}

module.exports = { getCodeFromFile };
