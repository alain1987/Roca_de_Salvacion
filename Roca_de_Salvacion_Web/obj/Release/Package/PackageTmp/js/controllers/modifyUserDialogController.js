'user strict';
app.controller('modifyUserDialogController', ['$scope', '$mdDialog',  function ($scope, $mdDialog) {
    // $scope.user = obj;
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.modify = function (user) {
        $mdDialog.hide(user);
    };
}]);