var MongoClient = require('mongodb').MongoClient;
var database = require('../config/database');
//用户信息插入mongo方法
var insertData = function(db, data, res, callback) {
  var collection = db.collection('userInfo');
  collection.createIndex({ 'name': 1 }, { unique: true });
  collection.insert(data, function(err, result) {
    if(err) {
      res.send({ 'code': 3, 'msg': '用户名重复，请重新填写!' });
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

module.exports = function(app) {
  //自定义变量
  var user = [];

  //sign路由
  app.get('/signin', function(req, res) {
    res.sendFile(process.cwd() + '/public/signin.htm');
  });
  app.get('/signup', function(req, res) {
    res.sendFile(process.cwd() + '/public/signup.htm');
  });


  //signup方法
  app.post('/signup', function(req, res) {
    user.name = req.body.name,
      user.password = req.body.password,
      MongoClient.connect(database.localUrl, function(err, db) {
        compareData(db, user, function(result) {
          if(result.length === 0) {
            res.send({ 'code': 3, 'msg': '用户名不存在!' });
          } else if(result[0].password === user.password) {
            res.send({ 'code': 1 });
          } else {
            res.send({ 'code': 2, 'msg': '密码错误！' });
          }
          db.close();
        })
      });
  });

  //signin方法
  app.post('/signin', function(req, res) {
    user = {
        'name': req.body.name,
        'password': req.body.password,
        'profession': req.body.profession,
        'id': req.body.id
      },
      MongoClient.connect(database.localUrl, function(err, db) {
        insertData(db, user, res, function(result) {
          var flag = result.result.ok;
          if(err) {
            console.log(err);
          } else if(flag === 1) {
            res.send({ 'code': 1, 'msg': '用户信息写入成功' });
          } else {
            res.send({ 'code': 2, 'msg': '用户信息写入失败' });
          }
          db.close();
        });
      });
  });

}