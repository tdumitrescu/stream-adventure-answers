var http    = require('http'),
    through = require('through');

var upper = function(buf) { this.queue(buf.toString().toUpperCase()); },
    end   = function()    { this.queue(null); };

var server = http.createServer(function(req, res) {
  req.pipe(through(upper, end)).pipe(res);
});

server.listen(process.argv[2]);
