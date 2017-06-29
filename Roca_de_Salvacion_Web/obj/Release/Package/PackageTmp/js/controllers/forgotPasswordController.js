'use strict';
app.controller('forgotPasswordController', ['$scope', '$timeout', '$location', 'passwordService','passDataService',
    function ($scope, $timeout, $location, passwordService, passDataService) {
        $scope.animateClass = "page-enter";
        $scope.recovery = {
            email:""
        };


        //Prueba
        $scope.showHints = false;

        $scope.recovery = function () {
            
            passwordService.recovery($scope.recovery.email).then(function (response) {

            //$scope.savedSuccessfully = true;
            $scope.mensj = "Revise su correo, sera redireccionado para entrar a la pagina en 2 segundos.";
            startTimer();

        },
        function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "No se ha enviar el enlace debido a:" + errors.join(' ');
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