angular.module('signCotroller', [])
  .controller('SignCtrl', function($scope, $http, $window, extend, CryptoJS, checkUser) {
    $scope.regForm = {};
    $scope.logForm = {};
    $scope.msg = '';
    $scope.appear = false;
    $scope.signup = function() {
      var err = checkUser($scope.regForm, 'signup');
      if(err) {
        $scope.msg = err;
        $scope.appear = true;
      } else {
        var tmp = {};
        extend(tmp, $scope.regForm);
        tmp.password = CryptoJS.SHA256(tmp.password).toString();
        tmp.password = CryptoJS.HmacSHA256(tmp.password, 'ustc').toString();
        delete tmp.repeatPassword;
        $http.post('/signup', tmp).success(function(data) {
          if(data.err) {
            console.log(data.err.message);
            $scope.msg = data.err.message;
            $scope.appear = true; //使alert展现
          } else {
            $scope.msg = '注册成功，请登陆';
            $scope.appear = true;
            $scope.logForm.username = $scope.regForm.username;
            $scope.logForm.password = $scope.regForm.password;
            //自动填充登陆框
          }
        }).error(function(data) {
          $scope.msg = '未知错误，请重试';
          $scope.appear = true;
        });
      }
    };
    $scope.signin = function() {
      var err = checkUser($scope.logForm, 'signin');
      if(err) {
        $scope.msg = err;
        $scope.appear = true;
      } else {
        var tmp = {};
        extend(tmp, $scope.logForm);
        tmp.password = CryptoJS.SHA256(tmp.password).toString();
        tmp.password = CryptoJS.HmacSHA256(tmp.password, 'ustc').toString();
        $http.post('/signin', tmp).success(function(data) {
          if(data.err) {
            console.log(data.err.message);
            $scope.msg = data.err.message;
            $scope.appear = true;
          } else {
            $window.location.href = '/';
          }
        }).error(function(data) {
          $scope.msg = '未知错误，请重试';
          $scope.appear = true;
        });
      }
    };
  });