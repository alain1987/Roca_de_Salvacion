'use strict';

app.controller('updateNewsController', ['$scope', 'passDataService', 'newsService', '$location', 'galleryAction','infService',
    function ($scope, passDataService, newsService, $location, galleryAction, infService) {
    $scope.myNews = {};


    function act() {
        infService.getInfCube().then(function (response) {
            $scope.myNews = passDataService.get();
        }, function (error) {
            alert(error.data.message);
        });
    }
    act();

    $scope.action = function () {
        galleryAction.set({ 'action': "update" });
        $location.path('/gallery');
    };

    $scope.cancel = function () {
        $location.path('/manageNews');
    };

    $scope.updateN = function (news) {
         newsService.updateNews(news).then(function (response) {
             $location.path('/manageNews');
          }, function () {
              alert("No se edito la noticia");
          });
    };

    $scope.back = function () {
        $location.path('/manageNews');
        passDataService.set(null);
    };
}]);