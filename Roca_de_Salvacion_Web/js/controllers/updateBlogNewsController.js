'use strict';

app.controller('updateBlogNewsController', ['$scope', 'passDataService', 'galleryAction', 'blogService', '$location', 'infService',
    function ($scope, passDataService, galleryAction, blogService, $location, infService) {
        $scope.blogNews = {};

        function act() {
            infService.getInfCube().then(function (response) {
                $scope.blogNews = passDataService.get();
            }, function (error) {
                alert(error.data.message);
            });
        }
       

        act();

        $scope.selectImage = function () {
            galleryAction.set({ 'action': "updateBlogNews" });
            passDataService.set($scope.blogNews);
            $location.path('/gallery');
        };

        $scope.updateBlogNews = function (blogNews) {
            blogService.updateBlogNews(blogNews).then(function (response) {
                passDataService.set(null);
                $location.path('/adminBlogNews');
            }, function (error) {
                alert(error.data.message);
            });
        };

        $scope.back = function () {
            passDataService.set(null);
            $location.path('/adminBlogNews');
        };
}]);