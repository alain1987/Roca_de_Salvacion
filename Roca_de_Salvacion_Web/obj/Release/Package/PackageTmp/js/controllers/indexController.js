'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', 'indexService','$timeout', function ($scope, $location, authService, indexService, $timeout) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }
    $scope.animateClass = "page-enter";

    $scope.authentication = authService.authentication;
    

}]);