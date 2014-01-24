var crypto    = require('crypto'),
    gunzip    = require('zlib').createGunzip(),
    tarParser = require('tar').Parse(),
    through   = require('through');

tarParser.on('entry', function(e) {
  if (e.type === 'File') {

    var fileLister = function() {
      this.queue(' ' + e.path + '\n');
    }

    e
      .pipe(crypto.createHash('md5', {encoding: 'hex'}))
      .pipe(through(null, fileLister))
      .pipe(process.stdout);
  }
});

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(gunzip)
  .pipe(tarParser);
