'use strict';

app.controller('allNewsController', ['$scope', 'newsService', '$mdDialog', '$location', 'passDataService', function ($scope, newsService, $mdDialog, $location, passDataService) {
    $scope.news = [];

    function act() {
        newsService.getAllNewsUsers().then(function (response) {
            $scope.news = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }
    act();

    $scope.openNews = function (ev, index) {
        $mdDialog.show({
            controller: 'newsDialogController',
            templateUrl: '../views/news/newsDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true, // Only for -xs, -sm breakpoints.
            scope: $scope,
            preserveScope: true,
            resolve: {
                myNews: function () {
                    return $scope.news[index];
                }
            }
        });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };


}]);