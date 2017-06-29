'use strict';
app.controller('updateMyBlogSettingsController', ['$scope', 'passDataService', '$location', 'galleryAction', 'blogService','authService',
    function ($scope, passDataService, $location, galleryAction, blogService, authService) {
        $scope.blog = {};
        function get() {
            if (authService.authentication.isAuth) {
                if (passDataService.get() == null) {
                    blogService.getMyBlogSettings(authService.authentication.userName).then(function (response) {
                        if (response.data == null) {
                            alert("Ningun administrador del sitio le ha creado un blog");
                            $location.path('/inf');
                        } else {
                            $scope.blog = response.data;
                        }

                    }, function (error) {
                        alert("Hubo un error al querer revisar su blog, contacte al administrador del sitio");
                        $location.path('/home');
                    });
                } else {
                    $scope.blog = passDataService.get();
                }
            } else {
                $location.path('/unauthorized');
            }
        }
        get();
        $scope.blog = passDataService.get();

        $scope.selectImage = function () {
            galleryAction.set({ 'action': "updateMyBlog" });
            passDataService.set($scope.blog);
            $location.path('/gallery');
        };

        $scope.updateBlog = function (blog) {
            blogService.updateBlog(blog).then(function (response) {
                passDataService.set(null);
                $location.path('/chooseBlog');
            }, function (error) {
                alert(error.data.message);
                $location('home');
            });
        };

        $scope.back = function () {
            passDataService.set(null);
            $location.path('/chooseBlog');
        };
    }]);