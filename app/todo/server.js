var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));

  // log every request to the console
  app.use(express.logger('dev'));

  // pull information from html in POST
  app.use(express.urlencoded());
  app.use(express.json());
});

//---define model
var Todo = mongoose.model('Todo', {
  text: String
});

app.get('*',function(req,res){
  res.sendfile('./public/index.html');
})


//---define routes
//get all todos
app.get('/api/todos', function(req, res) {
  //use mongoose to get all todos in the datebase
  Todo.find(function(err, todos) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if(err) { res.send(err); }
    res.json(todos); // return all todos in JSON format
  });
});

// create Todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if(err) { res.send(err) }
    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }
      res.json(todos);
    })
  });
});

app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }
    Todo.find(function(err, todos) {
      if(err) {
        res.send(err);
      }
      res.json(todos);
    })
  })
})

app.listen(8080);
console.log('app listening on port 8080');