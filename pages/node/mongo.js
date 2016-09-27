var MongoClient = require('mongodb').MongoClient;
var Local_Mongo_Url = 'mongodb://localhost:27017/test';

var insertData = function(db, callback) {
  var collection = db.collection('tb1');

  var data = [{ "name": 'eve', "age": 20 }, { "name": 'eve1', "age": 21 }];
  collection.insert(data, function(err, result) {
    if(err) {
      console.log('Error:' + err);
      return;
    }
    callback(result);
  });
}

var selectData = function(db, callback) {
  var collection = db.collection('tb1');

  var goalStr = { "name": "eve" };
  collection.find(goalStr).toArray(function(err, result) {
    if(err) {
      console.log('failed');
      return;
    }
    callback(result);
  });
}

var updateData = function(db, callback) {
  var collection = db.collection('tb1');

  var goalStr = { "name": "eve" };
  var newStr = { $set: { "age": 30 } };
  collection.update(goalStr, newStr, function(err, result) {
    if(err) {
      console.log('Error:' + err);
      return;
    }
    callback();
  });
}

var delData = function(db, callback) {
  var collection = db.collection('tb1');
  var goalStr = { "name": "eve" };
  collection.remove(goalStr, function(err, result) {
    if(err) {
      console.log('Error:' + err)
      return;
    }
    callback(result);
  })
}

MongoClient.connect(Local_Mongo_Url, function(err, db) {
  insertData(db, function(result) {
    db.close();
  });
  updateData(db, function(result) {
    db.close();
  });
  selectData(db, function(result) {
    db.close();
  });
  delData(db, function(result) {
    db.close();
  });
});