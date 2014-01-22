var duplex = require('duplexer'),
    spawn  = require('child_process').spawn;

module.exports = function (cmd, args) {
  child = spawn(cmd, args);
  return duplex(child.stdin, child.stdout);
};
