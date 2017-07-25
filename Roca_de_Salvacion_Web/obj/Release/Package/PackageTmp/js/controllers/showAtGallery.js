'use Strict';

app.controller('showAtGalleryController', ['$scope', 'galleryService', 'ngAuthSettings', '$location', 'passDataService',
    function ($scope, galleryService, ngAuthSettings, $location, passDataService) {
        $scope.images = null;
        $scope.base = ngAuthSettings.apiServiceBaseUri;
        $scope.show = true;
        $scope.myArray = [];

        function images() {
            galleryService.getAllImages().then(function (response) {
                $scope.images = response.data;
            }, function (error) {
                alert(error.data.message);
            });
        }

        images();
        $scope.showAtGallery = function () {
            var list = [];
            var positions = $scope.images;
            for (var i = 0; i < positions.length; i++) {
                if ($('#' + $scope.images[i].id).is(':checked')) {
                    list.push($scope.images[i]);
                }
            }
            galleryService.showAtGallery(list).then(function (response) {
                $location.path('/showGallery');
            }, function (error) {
                alert(error.data.message);
            });
        };

        $scope.check = function (index) {
            var checkboxes = $(':checked');
            if (checkboxes.length == 0) {
                $scope.show = true;
                alert("Debe seleccionar al menos una imagen para mostrar en la galeria de usuarios");
            } else if (checkboxes.length > 0) {
                $scope.show = false;
            }
        };

        $scope.home = function () {
            $location.path('/home');
            passDataService.set(null);
        };
    }]);