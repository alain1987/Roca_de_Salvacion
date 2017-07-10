'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', 'passDataService',
    function ($scope, $location, $timeout, authService, passDataService) {
    //$scope.animateClass = "page-enter";
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Se ha registrado exitosamente, sera redireccionado para entrar a la pagina en 2 segundos.";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "No se ha podido crear su cuenta debido a:" + errors.join(' ');
             alert(response.data.message);
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);
