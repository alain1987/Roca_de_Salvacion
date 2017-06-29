'use strict';

app.controller('createBlogController', ['$scope', 'blogService', 'passDataService', 'galleryAction','$location',
    function ($scope, blogService, passDataService, galleryAction, $location) {
        $scope.showPic = false;
        $scope.bloggers = [];

        function blogMembers() {
            blogService.search().then(function (response) {
                if (response.data == "") {
                    alert("Ya todos los miembros de la pagina tienen blog");
                    $location.path('/adminBlogs');
                }
            }, function (error) {
                alert(error.data.message);
            });
        }

        blogMembers();

        $scope.back = function () {
            passDataService.set(null);
            $location.path('/adminBlogs');
        };

        $scope.onLoad = function () {
            blogService.search().then(function (response) {
                if (response.data == "") {
                    alert("Ya todos los miembros de la pagina tienen blog");
                    $location.path('/adminBlogs');
                } else {
                    $scope.bloggers = response.data;
                }
            }, function (error) {
                alert(error.data.message);
            });
        };
        
        
        function check() {
            if (passDataService.get() == null) {
                $scope.showPic = false;
            } else {
                $scope.url = passDataService.get();
                $scope.showPic = true;
            }
        }
        check();

        $scope.selectImage = function () {
            galleryAction.set({ 'action': 'createBlog' });
            $location.path('/gallery');
        };

        $scope.createNewBlog = function (blog) {
            blog.mainUrlPicture = $scope.url;
            blog.userName = $scope.blogger;
            blogService.createBlog(blog).then(function (response) {
                passDataService.set(null);
                $location.path('/adminBlogs');
            }, function (error) {
                alert(error.data.message);
            });
        };

}]);