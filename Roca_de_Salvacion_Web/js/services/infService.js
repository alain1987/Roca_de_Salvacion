'use strict';
app.factory('infService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var infServiceFactory = {};

    var getInfCube = function () {

        return $http.get(serviceBase + '/api/Inf/cube').then(function (results) {
            return results;
        });
    };

    var getInfRule = function () {
        return $http.get(serviceBase + '/api/Inf/rule').then(function (results) {
            return results;
        });
    };
    var getInfDirt = function () {
        return $http.get(serviceBase + '/api/Inf/dirt').then(function (results) {
            return results;
        });
    };

    infServiceFactory.getInfCube = getInfCube;
    infServiceFactory.getInfRule = getInfRule;
    infServiceFactory.getInfDirt = getInfDirt;

    return infServiceFactory;

}]);