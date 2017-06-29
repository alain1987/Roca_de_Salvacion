'use strict';

app.controller('adminBlogNewsController', ['$scope', 'authService', 'blogService', '$mdDialog','passDataService','$location',
    function ($scope, authService, blogService, $mdDialog, passDataService,$location) {
    $scope.blogNews = [];

    $scope.authentication = authService.authentication;

    function act() {
        blogService.getTheBlogNews(authService.authentication.userName).then(function (response) {
            $scope.blogNews = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

    act();

    $scope.openUpdateBlogNews = function (blogNews) {
        passDataService.set(blogNews);
        $location.path('/updateBlogNews')
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
    
    $scope.openDeleteBlogNews = function (ev, id) {
        var confirm = $mdDialog.confirm()
                  .title('Confirma que desea eliminar este esta noticia del blog?')
                  .textContent('Si elimina el la noticia del blog despues no la podra recuperar')
                  .ariaLabel('AAA')
                  .targetEvent(ev)
                  .ok('Eliminar')
                  .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            blogService.deleteBlogNews(id).then(function (response) {
                act();
            }, function (error) {
                alert(error.data.message);
            });
        }, function (response) {
            alert("No se elimino por: " + response.data.message);
        });
    };


}]);
