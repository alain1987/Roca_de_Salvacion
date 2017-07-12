'use strict';
app.controller('adminBlogsController', ['$scope', '$mdDialog', 'blogService', 'passDataService','$location',
    function ($scope, $mdDialog, blogService, passDataService,$location) {
    $scope.blogs = [];

    
    function act() {
        blogService.getAllBlogs().then(function (response) {
            $scope.blogs = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

    act();
    $scope.openUpdateBlog = function (blog) {
        passDataService.set(blog);
        $location.path('/updateBlogSettings');
    };

    $scope.openDeleteBlog = function (ev, id, index) {
        var confirm = $mdDialog.confirm()
                  .title('Confirma que desea eliminar este blog?')
                  .textContent('Si elimina el blog se eliminaran todas las noticias que tenga este')
                  .ariaLabel('AAA')
                  .targetEvent(ev)
                  .ok('Eliminar')
                  .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            blogService.deleteBlog(id).then(function (response) {
                $scope.blogs.splice(index, 1);
                //act();
            }, function (error) {
                alert(error.data.message);
            });
        }, function (response) {
            alert("no se actualizo por: " + response.data.message);
        });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

    /*$scope.openUpdateBlogNews = function (blogNews) {

    };*/
}]);