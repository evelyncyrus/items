var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.static('./public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


//---define model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    default: ''
  }
});

function getTodos(res) {
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err);
    }
    res.json(todos); // return all todos in JSON format
  });
}

// ----- define routes
// get all todos
app.get('/todos', function(req, res) {
  getTodos(res);
});

//create Todo and send back all todos after creation
app.post('/todos', function(req, res) {
  // create a Todo, information comes from AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if(err) {
      res.send(err);
    }
    // get and return all the todos after you create another
    getTodos(res);
  });
});
// delete a todo
app.delete('/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if(err) { res.send(err); }
    // get and return all the todos after you create another
    getTodos(res);
  });
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(8080);
console.log('app listening on port 8080');