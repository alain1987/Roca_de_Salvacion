'use strict';

app.controller('updateBlogSettingsController', ['$scope', 'passDataService', '$location', 'galleryAction','blogService','infService',
    function ($scope, passDataService, $location, galleryAction, blogService, infService) {
    $scope.blog = {};

    function act() {
        infService.getInfCube().then(function (response) {
            $scope.blog = passDataService.get();
        }, function (error) {
            alert(error.data.message);
        });
    }

    act();

    $scope.selectImage = function () {
        galleryAction.set({ 'action': "updateBlog" });
        passDataService.set($scope.blog);
        $location.path('/gallery');
    };

    $scope.updateBlog = function (blog) {
        blogService.updateBlog(blog).then(function (response) {
            passDataService.set(null);
            $location.path('/adminBlogs');
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.back = function () {
        passDataService.set(null);
        $location.path('/adminBlogs');
    };
}]);