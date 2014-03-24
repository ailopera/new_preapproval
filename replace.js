var getRawBody = require("raw-body");
var urlencode = require('urlencode');

exports.module = function () {
  var getRawBody = function(req, res, next){
  console.log(req.headers);
  rawBody(req, {
      limit: '1mb',
      length: req.headers['content-length'],
      encoding: 'utf8'
    },
    function(err, buf){
      req.body = buf;
      next();
    });
  }
  var text = urlencode.decode(getRawBody);
  var patt1 = /\]\.[\w,\d]+\=/g;
  var result = text.match(patt1);
  var replaced = text;

  for(var i = 0; i < result.length; i++){
    var cad = result[i];
    var toReplace = "][" + cad.substring(2,cad.length-1) + "]=";
    var replaced = replaced.replace(cad, toReplace);
  }
}