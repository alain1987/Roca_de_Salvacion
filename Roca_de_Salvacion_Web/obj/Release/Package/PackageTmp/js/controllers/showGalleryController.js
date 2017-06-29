'use Strict';

app.controller('showGalleryController', ['$scope', 'galleryService', 'ngAuthSettings', '$location', 'passDataService',
    function ($scope, galleryService, ngAuthSettings, $location, passDataService) {
    $scope.images = null;
    $scope.base = ngAuthSettings.apiServiceBaseUri;
    $scope.show = true;
    $scope.myArray = [];

    function images() {
        galleryService.getAllImagesUser().then(function (response) {
            $scope.images = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

    images();

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };

}]);