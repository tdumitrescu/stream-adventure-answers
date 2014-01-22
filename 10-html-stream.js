var through = require('through'),
    trumpet = require('trumpet')();

var upper = function(buf) { this.queue(buf.toString().toUpperCase()); };

trumpet.selectAll('.loud', function(el) {
  var loudStream = el.createStream();
  loudStream.pipe(through(upper)).pipe(loudStream);
});

process.stdin.pipe(trumpet).pipe(process.stdout);
