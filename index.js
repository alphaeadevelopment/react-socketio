const main = require('./main');

module.exports = main.default;
module.exports.withSocket = main.withSocket;

console.log(module.exports);
