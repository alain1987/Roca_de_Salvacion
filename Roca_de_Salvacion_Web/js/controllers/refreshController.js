/// <reference path="refreshController.js" />
'use strict';
app.controller('refreshController', ['$scope', '$location', 'authService', '$timeout', 'passDataService',
    function ($scope, $location, authService, $timeout, passDataService) {

    $scope.authentication = authService.authentication;
    $scope.tokenRefreshed = false;
    $scope.tokenResponse = null;

    $scope.refreshToken = function () {

        authService.refreshToken().then(function (response) {
            $scope.tokenRefreshed = true;
            $scope.tokenResponse = response;
            $timeout(function () {
                $location.path('/home');
            },3000);
        },
         function (err) {
             $location.path('/login');
         });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);