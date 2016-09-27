//依赖
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//自定义变量
var user = [];
var Local_Mongo_Url = 'mongodb://localhost:27017/eve';
var signup_Path = __dirname + '\\view\\signup.htm';

//设置静态资源的相对路径
app.use('/static', express.static(__dirname + '\\view\\static'));

//sign路由
app.get('/signin', function(req, res) {
  res.sendFile(__dirname + '\\view\\signin.htm');
});
app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '\\view\\signup.htm');
});

//用户信息插入mongo方法
var insertData = function(db, data, callback) {
  var collection = db.collection('userInfo');

  collection.insert(data, function(err, result) {
    if(err) {
      console.log('Error:' + err);
      return;
    }
    callback();
  });
}

//数据库用户信息比较方法
var compareData = function(db, data, callback) {
  var collection = db.collection('userInfo');
  var goalStr = { "name": data.name };
  collection.find(goalStr).toArray(function(err, result) {
    if(err) {
      console.log('failed');
      return;
    }
    callback(result);
  });
}

//compareUser方法
app.get('/compareUser', function(req, res) {
  user.name = req.query.name,
  user.password = req.query.password,
  MongoClient.connect(Local_Mongo_Url, function(err, db) {
    compareData(db, user, function(result) {
      if(result[0].password === user.password) {
        // console.log('密码正确');
        res.send({'code':1});
      } else {
        res.send({'code':2});
      }
      db.close();
    })
  });
});

//setUser方法
app.get('/setUser', function(req, res) {
  user = {
    'name': req.query.name,
    'password': req.query.password,
    'profession': req.query.profession,
    'id': req.query.id
  },
  MongoClient.connect(Local_Mongo_Url, function(err, db) {
    user = JSON.parse(user),
      insertData(db, user, function(result) {
        db.close();
      });
  });
  user = JSON.stringify(user),
  fs.writeFile(file, user, function(err) {
    if(err) {
      console.log('错误');
    } else {
      console.log('写入数据为' + user);
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