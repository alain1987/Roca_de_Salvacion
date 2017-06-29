'use strict';

app.controller('chatController', ['$scope', '$location', 'passDataService', 'authService', function ($scope, $location, passDataService, authService) {

    $scope.user = {};

    function act() {
        if (authService.authentication.isAuth) {
            $scope.user = authService.authentication.userName;
        } else {
            $location.path('/unauthorized');
        }
    }

    act();

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);