'use strict';
app.factory('passwordService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var passwordServiceFactory = {};

    var _recovery = function (email) {

        return $http.get(serviceBase + '/api/Account/ForgotPassword', { params: { email :email} },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            return results;
        });
    };

    var _changePassword = function (userName,oldPassword,newPassword) {
        var data = "?userName=" + userName + "&currentPassword=" + oldPassword + "&newPassword=" + newPassword;
        return $http.post(serviceBase + '/api/Account/ChangePassword'+data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            return results;
        });
    };

    passwordServiceFactory.recovery = _recovery;
    passwordServiceFactory.changePassword = _changePassword;
    return passwordServiceFactory;

}]);