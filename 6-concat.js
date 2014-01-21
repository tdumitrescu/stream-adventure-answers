var concat = require('concat-stream');

var out = function(buf) {
  process.stdout.write(buf.toString().split('').reverse().join('') + '\n');
};

process.stdin.pipe(concat(out));
