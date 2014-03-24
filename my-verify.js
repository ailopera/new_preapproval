var https = require('https');
var qs = require('querystring');

var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';


exports.verify = function verify(params, callback) {
  if (typeof params === "undefined") {
    return callback(true, 'No params were passed to ipn.verify');
  }


  var body = params;
  body = body + "&cmd=_notify-validate";

  //Set up the request to paypal
  var req_options = {
    host: SANDBOX_URL,
    method: 'POST',
    path: '/cgi-bin/webscr',
    headers: {'Content-Length': body.length}
  }


  var req = https.request(req_options, function paypal_request(res) {
    res.on('data', function paypal_response(d) {
      var response = d.toString();

      callback(response != 'VERIFIED', response);
    });
  });

  //Add the post parameters to the request body
  req.write(body);

  req.end();

  //Request error
  req.on('error', function request_error(e) {
    console.log("ERRORRRR");
    callback(true, e);
  });
};
