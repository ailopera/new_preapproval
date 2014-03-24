
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var rawBody = require('raw-body');

var ipn = require('./routes/ipn_listener');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var getRawBody = function(req, res, next){
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

var user = require('./routes/user');
var preapproval = require('./routes/new_preapproval');

app.get('/', [express.json(), express.urlencoded()],routes.index);

app.post('/preapproval', [express.json(), express.urlencoded()], preapproval.doPreapproval);

app.post('/addItem', [express.json(), express.urlencoded()], user.addItem);

app.post('/ipn_listener', getRawBody, ipn.ipn_listener);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

