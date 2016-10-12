var Todo = angular.module('Todo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $scope.readTodo = function() {
    $http.get('/todos')
      .success(function(data) {
        // console.log(data)
        $scope.todos = data;
      }).error(function(data) {
        console.log('Error: ' + data);
      });
  }

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http.post('/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  }

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete('/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}