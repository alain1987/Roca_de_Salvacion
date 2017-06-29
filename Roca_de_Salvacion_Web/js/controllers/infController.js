'use strict';
app.controller('infController', ['$scope', 'infService', '$location', 'passDataService', function ($scope, infService, $location, passDataService) {
    $scope.inf = [];
    $scope.animateClass = "page-enter";
    infService.getInfCube().then(function (results) {
        $scope.infs = results.data;
    }, function (error) {
        alert(error.data.message);
    });

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);

