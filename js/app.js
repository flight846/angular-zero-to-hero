// Setter
var app = angular.module('App', [])

app.controller('MinMaxCtrl', function ($scope, $http) {
  $scope.formModel = {}
  $scope.onSubmit = function (valid) {
    if (valid) {
      window.alert('Submitted')
      console.log($scope.formModel)
    } else {
      window.alert('Not submitted')
    }

    // api
    // $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel)
    //   .success(function (data) {
    //     window.alert('Successfully signed in!')
    //   })
    //   .error(function (data) {
    //     window.alert('Try logging in again!')
    //   })
  }
})
