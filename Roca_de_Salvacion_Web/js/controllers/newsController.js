'use strict';

app.controller('newsController', ['$scope', 'passDataService', 'newsService', '$location','infService',
    function ($scope, passDataService, newsService, $location, infService) {
        $scope.img_src = {};
        function act() {
            infService.getInfCube().then(function (response) {
                $scope.img_src = passDataService.get();
            }, function (error) {
                alert(error.data.message);
            });
        }

        act();

    
    
    $scope.publish = function (news) {
        news.UrlImagen = $scope.img_src;
        newsService.addNews(news).then(function (response) {
            passDataService.set(null);
            $location.path('/manageNews');
        }, function (error) {
            alert("No se pudo publicar la noticia" + error);
            passDataService.set(null);
            $location.path('/manageNews');
        });
    };

    $scope.back = function () {
        passDataService.set(null);
        $location.path('/adminBlogNews');
    };
}]);