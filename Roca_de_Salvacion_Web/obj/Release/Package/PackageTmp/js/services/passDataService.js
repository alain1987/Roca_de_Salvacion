'use strict';

app.factory('passDataService', function () {
    var dataService = {};
    var savedData = null;

    dataService.set = function (object) {
        savedData = object;
    };

    dataService.get = function () {
        return savedData;
    };

    return dataService;
});