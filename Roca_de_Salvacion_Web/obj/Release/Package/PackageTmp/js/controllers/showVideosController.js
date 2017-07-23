'use strict';

app.controller('showVideosController', ['$scope', 'videosService', '$mdDialog', '$sce', '$uibModal','$location','passDataService',
    function ($scope, videosService, $mdDialog, $sce, $uibModal, $location, passDataService) {
    $scope.videos = [];

    function getVideosId(videoUrl) {
        videoUrl = videoUrl.toString();
        var count = videoUrl.length;
        var str = "";
        var i;
        for (i = 44; i < count; i++) {
            if (videoUrl.charAt(i) != '"') {
                str = str + videoUrl.charAt(i);
            } else {
                break;
            }
        }
        return str;
    }

    function allVideos() {
        videosService.getUsersVideos().then(function (response) {
            var count = response.data.length;
            for (var i = 0; i < count; i++) {
                $scope.videos = response.data;
                $scope.videos[i].urlVideo = $sce.trustAsHtml($scope.videos[i].urlVideo);
                $scope.videos[i].img = "http://img.youtube.com/vi/" + getVideosId(response.data[i].urlVideo) + "/0.jpg";
            }
        }, function (error) {
            alert(error.data.message);
        });
    }

    allVideos();

    $scope.showVideo = function (index) {
        var realIndex
        var m = parseInt($("li[class*='active'] a").text());
        if (m > 1) {
            realIndex = ((10 * (m-1))+index);
        } else {
            realIndex = index;
        }
        
        var modalInstance = $uibModal.open({
            //  animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myVideoContent.html',
            controller: 'showVideoController',
            // size: size,
            backdrop: false,
            scope: $scope,
            resolve: {
                myVideo: function () {
                    return $scope.videos[realIndex];
                }
            }
        });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);