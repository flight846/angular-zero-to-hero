// Go to jonsamwell.github.io/angular-auto-validate
// 1. Download the zip
// 2. Extract and copy the js file under src folder and paste to your js directory
// 3. Add the plugin dependencies
// Good to go

// Setter
var app = angular.module('App', [
  'jcs-autoValidate',
  'angular-ladda'
])

// Initialise defualt error messages functionality before controller actions
app.run(function (defaultErrorMessageResolver) {
  defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
    errorMessages['tooYoung'] = 'You must be at least {0} years old to use this site'
    errorMessages['tooOld'] = 'You must be max {0} years old to use this site'
    errorMessages['badUsername'] = 'Username can only contain numbers and letters and _'
  })
})

app.controller('MinMaxCtrl', function ($scope, $http, $window, $location) {
  $scope.formModel = {}
  $scope.submitting = false

  $scope.onSubmit = function () {
    $scope.submitting = true
    console.log('Submitting')
    console.log($scope.formModel)

    $http.post('http://minmax-server.herokuapp.com/register/', $scope.formModel)
    .success(function () {
      window.alert('Submitted')
      $scope.submitting = false
      $window.location.href = './index.html'
    }).error(function () {
      window.alert('Error in submitting')
      $scope.submitting = false
    })
  }
})
