//依赖
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

//configuration
app.use('/static', express.static('./public')); //设置静态资源的相对路径
app.use(bodyParser.urlencoded()); //解析


//routes
require('./app/routes.js')(app);

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('访问地址http://', host, port);
});