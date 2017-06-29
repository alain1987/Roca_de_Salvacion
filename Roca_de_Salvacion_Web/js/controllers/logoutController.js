'use strict';
app.controller('logoutController', ['$scope', '$location', 'authService', 'passDataService', function ($scope, $location, authService, passDataService) {
    $scope.animateClass = "page-enter";
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
        passDataService.set(null);
    };

    $scope.authentication = authService.authentication;

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);
