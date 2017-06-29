'use Strict';
app.controller('unauthorizedController', ['$timeout', '$location', '$scope', 'authService', function ($timeout, $location, $scope, authService) {
    $scope.animateClass = "error-enter";
    $timeout(function () {
        if (authService.authentication.isAuth) {
            $location.path('/home');
        } else {
            authService.logOut();
            $location.path('/home');
        }
    }, 4000);
}]);