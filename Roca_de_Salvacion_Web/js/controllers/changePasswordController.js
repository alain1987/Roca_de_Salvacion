'use strict';

app.controller('changePasswordController', ['$scope', 'passwordService', '$location', 'authService', 'passDataService',
    function ($scope, passwordService, $location, authService, passDataService) {

        $scope.userName = authService.authentication.userName;

        function isAuth() {
            if ($scope.userName == "" || $scope.userName == null) {
                alert("Debe iniciar sesion para poder acceder a esta seccion");
                $location.path('/login');
            }
        }

        isAuth();

        $scope.changePassword = function (password) {
        passwordService.changePassword($scope.userName, password.oldPassword, password.newPassword).then(function (response) {
            $location.path('/home');
        }, function (error) {
            alert(error.data.message);
        })
    };

        $scope.home = function () {
            $location.path('/home');
            passDataService.set(null);
        };
}]);
