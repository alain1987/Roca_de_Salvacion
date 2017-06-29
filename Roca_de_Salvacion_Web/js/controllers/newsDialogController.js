'use strict';

app.controller('newsDialogController', ['$scope', '$mdDialog', 'myNews', function ($scope, $mdDialog, myNews) {
    $scope.myNews = {};

    $scope.myNews = myNews;
   /* $scope.hide = function () {
        $mdDialog.hide();
    };*/

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);