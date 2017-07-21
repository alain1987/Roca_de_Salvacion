'use Strict';
app.factory('usersService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    usersFactory = {};

    usersFactory.getUsers = function () {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Account/allUsers").then(function (response) {
            return response;
        });
    };

    usersFactory.getUser = function (id) {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Account/user", {
            params: {
                'id': id
            }
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            return response;
        });
    };

    usersFactory.deleteUser = function (id) {
        return $http.delete(ngAuthSettings.apiServiceBaseUri + "/api/Account/deleteUser",
            {
                params: {
                    'id':id
                }
            }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            return response;
        });
    };

    usersFactory.updateUser = function (user) {
        return $http.put(ngAuthSettings.apiServiceBaseUri + "/api/Account/updateUser", user).then(function (response) {
            return response;
        });
    };

    //Cambiar contrasena
    usersFactory.updateUserPassword = function (id, newPassword) {
        var str = "?id=" + id + "&newPassword=" + newPassword;
        return $http.put(ngAuthSettings.apiServiceBaseUri + "/api/Account/updateUserPassword"+str
          /*  {
                params: {
                    'id': id,
                    'newPassword': newPassword
                }
            }*/, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            return response;
        });
    };

    return usersFactory;
}]);