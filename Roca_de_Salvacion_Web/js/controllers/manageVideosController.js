'use strict';

app.controller('manageVideosController', ['$scope', 'videosService', '$mdDialog', '$sce', '$uibModal', '$location','passDataService',
    function ($scope, videosService, $mdDialog, $sce, $uibModal,$location,passDataService) {
    $scope.videos = [];
    $scope.images = [];

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
        videosService.getAllVideos().then(function (response) {
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


    $scope.deleteVideo = function (evt, id) {

        var confirm = $mdDialog.confirm()
          .title('Desea eliminar este video???')
          .textContent('Si elimina este video no podra recuperarlo')
          .ariaLabel('dlknlkefnwel')
          .targetEvent(evt)
          .ok('Eliminar')
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            videosService.deleteVideo(id).then(function (response) {
                allVideos();
            }, function (error) {
                alert("No se pudo eliminar debido a: " + error.data.message);
            });
        }, function () {
           // $location.path('/manageNews');
        });

    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    //Dialogo para anadir Video
    $scope.addVideo = function (ev) {
        $mdDialog.show({
            controller: addVideoDialogController,
            templateUrl: 'videos/videosDialogs/addVideoDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
        .then(function () {
        }, function () {
            $mdDialog.hide();
        });
    };
    //cntroladora para el dialogo
    function addVideoDialogController($scope, $mdDialog, videosService) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.addVideo = function (video) {
            videosService.addVideo(video).then(function (response) {
                allVideos();
                $mdDialog.hide();
            }, function (error) {
                alert("No se pudo adicionar por: " + error.data.message);
            });
            
        };
    }

    //Update the video
    $scope.updateVideo = function (ev,video) {
        $mdDialog.show({
            controller: updateVideoDialogController,
            templateUrl: 'videos/videosDialogs/updateVideoDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true, // Only for -xs, -sm breakpoints.
            resolve: {
                video: function () {
                    return video;
                }
            }
        })
        .then(function () {
        }, function () {
            $mdDialog.hide();
        });
    };
    //cntroladora para el dialogo
    function updateVideoDialogController($scope, $mdDialog, videosService, video) {
        $scope.video = {};
        $scope.video = video;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.updateVideo = function (video) {
            video.urlVideo = video.urlVideo.toString();
            videosService.updateVideo(video).then(function (response) {
                allVideos();
                $mdDialog.hide();
            }, function (error) {
                alert(error.data.message);
            });

        };
    }


    //Para los radio button
    $scope.updateShowVideo = function (evt, video) {

        var confirm = $mdDialog.confirm()
          .title('Desea mostrar este video en la pantalla de inicio?')
          .textContent('Al realizar este cambio el video seleccionado se mostrara en la pagina principal')
          .ariaLabel('A')
          .targetEvent(evt)
          .ok('Mostrar')
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            video.isShow = "true";
            video.urlVideo = video.urlVideo.toString();
            videosService.updateVideo(video).then(function (response) {
                allVideos();
                $mdDialog.hide();
            }, function (error) {
                alert(error.data.message);
            });
        }, function () {
            // $location.path('/manageNews');
        });

    };

    //var $ctrl = this;
    $scope.showVideo = function (index) {
        
        var modalInstance = $uibModal.open({
          //  animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myVideoContent.html',
            controller: 'showVideoController',
           // size: size,
            backdrop: false,
            scope:$scope,
            resolve:{
                myVideo: function () {
                    return $scope.videos[index];
                }
            }
        });
    };

    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
}]);