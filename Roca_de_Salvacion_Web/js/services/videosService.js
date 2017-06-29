'use strict';

app.factory('videosService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var base = ngAuthSettings.apiServiceBaseUri;
    var videosServiceFactory = {};

    videosServiceFactory.getAllVideos = function () {
        return $http.get(base + "/api/Videos/getAllVideos").then(function (response) {
            return response;
        });
    };

    videosServiceFactory.getUsersVideos = function () {
        return $http.get(base + "/api/Videos/getUsersVideos").then(function (response) {
            return response;
        });
    };

    videosServiceFactory.deleteVideo = function (id) {
        return $http.delete(base + "/api/Videos/deleteVideo",{params:{'id':id}}).then(function (response) {
            return response;
        });
    };

    videosServiceFactory.addVideo = function (video) {
        return $http.post(base + "/api/Videos/addVideo",video).then(function (response) {
            return response;
        });
    };

    videosServiceFactory.showVideo = function () {
        return $http.get(base + "/api/Videos/showVideo").then(function (response) {
            return response;
        });
    };

    videosServiceFactory.updateVideo = function (videos) {
        return $http.put(base + "/api/Videos/updateVideo", videos).then(function (response) {
            return response;
        });
    };

    return videosServiceFactory;
}]);
