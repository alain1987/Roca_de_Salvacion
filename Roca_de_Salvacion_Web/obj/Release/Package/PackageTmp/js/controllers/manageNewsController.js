'use strict';

app.controller('manageNewsController', ['$scope', 'newsService', 'passDataService', '$location', 'galleryAction', function ($scope, newsService, passDataService, $location, galleryAction) {
    passDataService.set(null);
    $scope.news = [];
    $scope.myNews = {};
    $scope.myArray = [];
    $scope.animateClass = "page-enter";

    function actualizar() {
        newsService.getAllNews().then(function (response) {
            $scope.news = response.data;
        }, function () {
            alert("No hay elementos");
        });
    };

    actualizar();

    //get para unosd
    //add--chequear si se manda algun valor para la gallery
    $scope.publish = function () {
        galleryAction.set({ 'action': 'add' });
        $location.path('/gallery');
    }
    //delete
    $scope.deleteNews = function (news) {
        newsService.deleteNews(news).then(function (response) {
            actualizar();
        }, function () {
            alert("No hay elementos");
        });
    };
    //update Url
    $scope.updateNews = function (news) {
        passDataService.set(news);
        $location.path('/updateNews');
    };

    $scope.check = function (index) {
        var checkboxes = $(':checked');
        if (checkboxes.length > 3 || checkboxes.length == 0) {
            $scope.show = true;
        } else {
            $scope.show = false;
        }
    };

    //Update
    $scope.updateNewsIsShow = function () {

        var list = [];
        var news = $scope.news;
        for (var i = 0; i < news.length; i++) {
            if ($('#' + $scope.news[i].id).is(":checked")) {
                list.push($scope.news[i]);
            }
        }
        newsService.updateNewsIsShow(list).then(function (response) {
            actualizar();
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);