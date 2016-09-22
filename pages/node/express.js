//依赖
var express = require('express');
var app = express();
var fs = require('fs');

//自定义变量
var user = [];
var oldData = '';
var file = __dirname + '\\file\\demo.json';

app.use(express.static('public'));

app.get('/sbdd', function(req, res) {
  res.sendFile(__dirname + '\\view\\index.htm');
});

fs.readFile(file, 'utf-8', function(err, data) {
  if(err) {
    console.log('读取失败')
  } else {
    oldData = JSON.parse(data);
  }
});
app.get('/addUser', function(req, res) {
  user = {
      'user4': {
        'name': req.query.name,
        'password': req.query.password,
        'profession': req.query.profession,
        'id': req.query.id
      }
    },
    typeof oldData == 'string' ? oldData = JSON.parse(oldData) : oldData,
    oldData['user4'] = user['user4'],
    oldData = JSON.stringify(oldData),
    fs.writeFile(file, oldData, function(err) {
      if(err) {
        console.log('错误');
      } else {
        console.log('写入数据为' + oldData);
      }
    });

  fs.readFile(file, 'utf-8', function(err, data) {
    if(err) {
      console.log('读取文件失败');
    } else {
      res.end(data);
    }
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('访问地址http://', host, port);
});