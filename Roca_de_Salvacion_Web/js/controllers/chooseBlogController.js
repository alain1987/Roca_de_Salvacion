'use strict';

app.controller('chooseBlogController', ['$scope', 'blogService', 'passDataService', '$location',
    function ($scope, blogService, passDataService,$location) {
    $scope.blogOwners = [];

    getBlogOwners();
    //Lista de Bloggers
    function getBlogOwners() {
        blogService.getBlogOwners().then(function (response) {
            $scope.blogOwners = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

    $scope.openBlog = function (blog) {
        //passDataService.set(null);
        passDataService.set(blog);
        $location.path('/blog');
    };
}]);