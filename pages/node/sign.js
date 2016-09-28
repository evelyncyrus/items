//依赖
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//自定义变量
var user = [];
var Local_Mongo_Url = 'mongodb://localhost:27017/eve';

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
var insertData = function(db, data, res, callback) {
  var collection = db.collection('userInfo');
  collection.createIndex({ 'name': 1 }, { unique: true });
  collection.insert(data, function(err, result) {
    if(err) {
      res.send({ 'code': 3, 'msg': err });
      return;
    }
    callback(result);
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
          res.send({ 'code': 1 });
        } else {
          res.send({ 'code': 2 });
        }
        db.close();
      })
    });
});

//setUser方法
app.get('/setUser', function(req, res) {
  var res = res;
  user = {
      'name': req.query.name,
      'password': req.query.password,
      'profession': req.query.profession,
      'id': req.query.id
    },
    MongoClient.connect(Local_Mongo_Url, function(err, db) {
      insertData(db, user, res, function(result) {
        var flag = result.result.ok;
        if(flag === 1) {
          res.send({ 'code': 1, 'msg': '用户信息写入成功' });
        } else {
          res.send({ 'code': 2, 'msg': '用户信息写入失败' });
        }
        db.close();
      });
    });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('访问地址http://', host, port);
});