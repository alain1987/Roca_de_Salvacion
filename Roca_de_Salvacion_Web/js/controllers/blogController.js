'use strict';

app.controller('blogController', ['$scope', 'passDataService', 'blogService', '$location', 'infService',
    function ($scope, passDataService, blogService, $location, infService) {
    $scope.blogSettings = {};
    $scope.blogNews = {};

    function settings() {
        var blogS = passDataService.get();
        if (blogS != null) {
            infService.getInfDirt().then(function (response) {
                blogService.getMyBlog(blogS.name).then(function (response) {
                    $scope.blogSettings = response.data;
                    blogService.getBlogNews(blogS.name).then(function (resp) {
                        $scope.blogNews = resp.data;
                        passDataService.set(null);
                    }, function (error) {
                        alert(error.data.message);
                    });
                }, function (error) {
                    alert(error.data.message);
                });

                blogService.getBlogNews(blogS.name).then(function (response) {
                    $scope.blogNews = response.data;
                });
            }, function (error) {
                alert(error.data.message);
            });
        } else {
            $location.path('/chooseBlog');
        }
    }

    settings();

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);