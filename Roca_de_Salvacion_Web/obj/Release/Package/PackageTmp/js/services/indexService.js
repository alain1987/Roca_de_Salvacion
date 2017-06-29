'use strict';

app.factory('indexService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var indexService = {};
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    indexService.getOperations = function (userName) {
        return $http.get(serviceBase + "/api/Operations/get", { params: { 'userName': userName } }).then(function (response) {
            return response;
        });
    };

    return indexService;

}]);