'use strict';
app.controller('homeController', ['$scope', 'authService', 'indexService', '$location', 'videosService', '$sce', 'galleryService', 'ngAuthSettings', 'newsService','$mdDialog',
    function ($scope, authService, indexService, $location, videosService, $sce, galleryService, ngAuthSettings, newsService, $mdDialog) {
    $scope.animateClass = "page-enter";
        //$scope.mensaje = "Aleluyaaa";
    $scope.base = ngAuthSettings.apiServiceBaseUri;
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
    $scope.slides = [];
    $scope.news = [];

        //images
    /*function show() {
        
    }
    show();*/
       /* { id:1,image: '../../../Content/images/IMG-20170425-WA0047.jpg', text: "Ministrando" },
        { id:2,image: '../../../Content/images/IMG-20170425-WA0023.jpg', text: "Crucifinccion" },
        { id:3, image: '../../../Content/images/IMG-20170425-WA0014.jpg', text: "Para Matrimonios" }
        ];*/
   /* var indexController = $controller('indexController', { $scope: $scope });
    indexController.act();*/

    $scope.authentication = authService.authentication;

    $scope.menu = [];
    
    $scope.logout = function () {
        $location.path('/logout');
    };

    $scope.changePage = function (index) {
        $location.path($scope.menu[index].operationPath);
    };

    var act = function () {
        indexService.getOperations(authService.authentication.userName).then(function (response) {
            $scope.menu = response.data;
        }, function (error) {
            alert(error.data.message);
        });
        galleryService.getShowImages().then(function (response) {
            $scope.slides = response.data;
        }, function (error) {
            alert(error.data.message);
        });

        newsService.allNewsShow().then(function (response) {
            $scope.news = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    };

    act();

    $scope.myVideo = {};
    $scope.videoMessage = "";

    $scope.showAllVideos = function () {
        $location.path('/showVideos');
    };

    function show() {
        videosService.showVideo().then(function (response) {
            $scope.myVideo = response.data;
            $scope.myVideo.urlVideo = $sce.trustAsHtml($scope.myVideo.urlVideo);
            $scope.videoMessage = "";
        },function(error){
            $scope.myVideo = null;
            $scope.videoMessage = error.data.message;
        });
    }

    show();

    $scope.allNews = function () {
        $location.path('/allNews');
    };

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
        });/*
        .then(function () {
        }, function () {
        });*/
    };

    $scope.allPictures = function () {
        $location.path('/showGallery');
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
}]);