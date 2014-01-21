var through = require('through'),
    split   = require('split');

var ln = 1;

var tr = through(function(buf) {
  var s = buf.toString();
  s = (ln++ % 2 == 0) ? s.toUpperCase() : s.toLowerCase();
  this.queue(s + '\n');
});

process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
