var combine = require('stream-combiner'),
    split   = require('split')(),
    through = require('through'),
    gzip    = require('zlib').createGzip();
    
module.exports = function () {
  var genres = [],
      groupGenres = through(
        function write(buf) {
          if (buf.length === 0) {
            return;
          }

          var o = JSON.parse(buf);
          if (o.type === 'genre') {
            genres.push({name: o.name, books: []});
          } else {
            genres[genres.length - 1].books.push(o.name);
          }
        },
        function end() {
          var self = this;
          genres.forEach(function(genre) {
            self.queue(JSON.stringify(genre) + "\n");
          });
          self.queue(null);
        }
      );

  return combine(split, groupGenres, gzip);
};
