'use strict';

app.controller('addBlogNewsController', ['$scope', 'blogService', 'passDataService', 'galleryAction', '$location', 'authService', 'infService',
    function ($scope, blogService, passDataService, galleryAction, $location, authService, infService) {
    $scope.showPic = false;

    function check() {
        infService.getInfCube().then(function (response) {
            if (authService.authentication.isAuth) {
                if (passDataService.get() == null) {
                    $scope.showPic = false;
                    // $location.path('/home');
                } else {
                    $scope.url = passDataService.get();
                    $scope.showPic = true;
                }
            } else {
                $location.path('/unauthorized');
            }
        }, function (error) {
            alert(error.data.message);
        });
    }
    check();

    $scope.selectImage = function () {
        galleryAction.set({ 'action': 'addBlogNews' });
        $location.path('/gallery');
    };

    $scope.back = function () {
        passDataService.set(null);
        $location.path('adminBlogNews');
    };

    $scope.addNewsBlog = function (blogNews) {
        blogNews.userName = authService.authentication.userName;
        blogNews.mainUrlPicture = $scope.url;
        //alert(blogNews.userName + " " + blogNews.mainUrlPicture + " " + blogNews.title + " " + blogNews.text);
        blogService.addBlogNews(blogNews).then(function (response) {
            passDataService.set(null);
            $location.path('/adminBlogNews');
        }, function (error) {
            alert(error.data.message);
        });
    };
}]);