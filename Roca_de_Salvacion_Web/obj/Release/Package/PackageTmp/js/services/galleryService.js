'use strict';

app.factory('galleryService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var galleryService = {};
    var base = ngAuthSettings.apiServiceBaseUri;

    galleryService.getAllImages = function(){
        return $http.get(base + '/api/File/getAllImages').then(function (response) {
            return response;
        });
    };
    //showAtGallery
    galleryService.showAtGallery = function (images) {
        return $http.put(base + '/api/File/showAtGallery',images).then(function (response) {
            return response;
        });
    };

    galleryService.getAllImagesUser = function () {
        return $http.get(base + '/api/File/getAllImagesUser').then(function (response) {
            return response;
        });
    };

    galleryService.getShowImages = function () {
        return $http.get(base + '/api/File/getShowImages').then(function (response) {
            return response;
        });
    };


    galleryService.deleteImage = function (name) {
        return $http.delete(base + '/api/File/deleteImage', {params:{'name':name}}).then(function (response) {
            return response;
        });
    };

    galleryService.isShow = function (images) {
        console.log(images);
        return $http.put(base + '/api/File/showImage', images).then(function (response) {
            return response;
        });
    };

    return galleryService;
}]);