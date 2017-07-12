'use strict';
app.controller('showVideoController', ['$scope', 'myVideo', '$uibModalInstance','$sce',
    function ($scope, myVideo, $uibModalInstance,$sce) {
    
        $scope.myVideo = myVideo;
       $scope.myVideo.urlVideo = (myVideo.urlVideo).toString();
       $scope.myVideo.urlVideo = $sce.trustAsHtml(myVideo.urlVideo);

       $scope.cancel = function () {
           $uibModalInstance.dismiss('cancel');
       };

}]);