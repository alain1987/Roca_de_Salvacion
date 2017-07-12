'use strict';

app.controller('newsController', ['$scope', 'passDataService', 'newsService', '$location', 'infService', 'galleryAction',
    function ($scope, passDataService, newsService, $location, infService, galleryAction) {
        $scope.img_src = "";

      
        function act() {
            infService.getInfCube().then(function (response) {
                if (passDataService.get() == null) {
                    $scope.showPic = false;
                }else {
                    $scope.img_src = passDataService.get();
                    $scope.showPic = true;
                }
                
            }, function (error) {
                alert(error.data.message);
            });
        }

        act();

    
        $scope.selectImage = function () {
            galleryAction.set({ 'action': 'add' });
            $location.path('/gallery');
        };

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
        $location.path('/manageNews');
    };
}]);