var duplex = require('duplexer'),
    Stream = require('stream');

module.exports = function (counter) {
  var countries     = {},
      countryStream = Stream.Writable({ objectMode: true });

  countryStream._write = function (o, enc, next) {
    if (!countries[o.country]) {
      countries[o.country] = 0;
    }
    countries[o.country]++;
    next();
  };

  countryStream.on('finish', function() {
    counter.setCounts(countries);
  });

  return duplex(countryStream, counter);
};
