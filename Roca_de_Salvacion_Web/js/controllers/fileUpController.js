'use strict';
app.controller('fileUpController', ['$scope', '$http', 'ngAuthSettings', '$location', 'passDataService', 'infService',
    function ($scope, $http, ngAuthSettings, $location, passDataService, infService) {
    var formData = new FormData();
    $scope.animateClass = "page-enter";

    $scope.getTheFiles = function ($files) {
        $scope.imagesrc = [];

        for (var i = 0; i < $files.length; i++) {
            var reader = new FileReader();
            reader.fileName = $files[i].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.fileName;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;

                $scope.imagesrc.push(image);
                $scope.$apply();
            }

            reader.readAsDataURL($files[i]);
        }

        angular.forEach($files, function (value, key) {
            formData.append(key, value);
        });
    };

    $scope.uploadFiles = function () {
        var request = {
            method: 'POST',
            url: ngAuthSettings.apiServiceBaseUri+'/api/File/upload',
            data: formData,
            headers: {
                'Content-Type': undefined
            }
        };

        $http(request).success(function (response) {
            alert(response);
            $scope.reset();
        }).error(function () {
            alert("No se publico la noticia");
            $scope.reset();
        });
    };

    $scope.reset = function () {
        angular.forEach(
            angular.element("input[type = 'file']"),
        function (inputElem) {
            angular.element(inputElem).val(null);
        }
        );
        $scope.imagesrc = [];
        formData = new FormData();
        $location.path('/gallery');
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);