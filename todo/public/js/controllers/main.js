angular.module('todoController', [])

.controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
  $scope.formData = {};
  $scope.loading = true;

  //get
  Todos.get()
    .success(function(data) {
      $scope.todos = data;
      $scope.loading = false;
    });

  //create
  $scope.createTodo = function() {
    if($scope.formData.text != undefined) {
      $scope.loading = true;

      Todos.create($scope.formData)
        .success(
          function(data) {
            $scope.loading = false;
            $scope.formData = {};
            $scope.todos = data;
          }
        )
    }
  }

  //delete
  $scope.deleteTodo = function(id) {
    $scope.loading = true;

    Todos.delete(id)
      .success(function(data) {
        $scope.loading = false;
        $scope.todos = data;
      });
  };

}]);