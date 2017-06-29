'use strict';

app.factory('newsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var newsService = {};
    var base = ngAuthSettings.apiServiceBaseUri;

    newsService.getAllNews = function () {
        return $http.get(base + "/api/News/allNews").then(function (response) {
            return response;
        });
    };

    newsService.allNewsShow = function () {
        return $http.get(base + "/api/News/allNewsShow").then(function (response) {
            return response;
        });
    };

    newsService.getAllNewsUsers = function () {
        return $http.get(base + "/api/News/allNewsUsers").then(function (response) {
            return response;
        });
    };

    newsService.addNews = function (news) {
        return $http.post(base + '/api/News/addNews', news).then(function (response) {
            return response;
        });
    };

    newsService.deleteNews = function (news) {
        return $http.delete(base + '/api/News/deleteNews', {params:{'id':news.id}}).then(function (response) {
            return response;
        });
    };

    newsService.updateNews = function (news) {
        return $http.put(base + '/api/News/updateNews', news).then(function (response) {
            return response;
        });
    };

    newsService.updateNewsIsShow = function (news) {
        return $http.put(base + '/api/News/updateNewsIsShow', news).then(function (response) {
            return response;
        });
    };

    return newsService;
}]);