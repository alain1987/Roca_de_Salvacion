'use Strict';

app.controller('showImgAtHomeController', ['$scope', 'galleryService', 'ngAuthSettings', '$location', 'passDataService',
    function ($scope, galleryService, ngAuthSettings, $location,passDataService) {
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
    $scope.showImg = function () {
        var list = [];
        //var positions = $scope.myArray;
        var positions = $scope.images;
        for (var i = 0; i < positions.length; i++) {
            if ($('#' + $scope.images[i].id).is(":checked")) {
                list.push($scope.images[i]);
            }
        }
            //list.push($scope.images[positions[i]]);
        galleryService.isShow(list).then(function (response) {
            // images();
            $location.path('/home');
        }, function (error) {
            alert(error.data.message);
        });
    };

    $scope.check = function (index) {
        var checkboxes = $(':checked');
        if (checkboxes.length > 5 || checkboxes.length == 0) {
                $scope.show = true;
        } else {
            //$scope.myArray.push(index)
                $scope.show = false;
        }
    };
    
    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);