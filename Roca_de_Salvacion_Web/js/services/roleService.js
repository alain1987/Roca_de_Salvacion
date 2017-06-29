'use Strict';
app.factory('roleService', ['$http','ngAuthSettings', function ($http,ngAuthSettings) {
    rolefactory = {};

    rolefactory.retrieveRole = function () {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Roles/retrieveRole").then(function (response) {
            return response;
        });
    };

    rolefactory.getRoleNames = function () {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Roles/getRoleNames").then(function (response) {
            return response;
        });
    };
    
    rolefactory.getRoleFromUser = function (userId) {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Roles/getRoleFromUser", { params: { 'userId': userId } },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                return response;
            });
    };

    rolefactory.setUserRole = function (userId, oldRole, newRole) {
        var str = "?userId=" + userId + "&oldRole=" + oldRole + "&newRole=" + newRole;
        return $http.put(ngAuthSettings.apiServiceBaseUri + "/api/Roles/setUserRole" + str, 
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                return response;
            });
    };
  /*  rolefactory.addRole = function (role) {
        return $http.post(ngAuthSettings.apiServiceBaseUri + "/api/Roles/addRole", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }, { params: { name: role.name } }).then(function (response) {
            return response;
        });
    };
    */
    /*rolefactory.deleteRole = function (id) {
        return $http.delete(ngAuthSettings.apiServiceBaseUri + "/api/Roles/deleteRole",
            {
                params: {
                    'id':id
                }
            }
            , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            return response;
        });
    };*/

    rolefactory.getUsersRole = function () {
        return $http.get(ngAuthSettings.apiServiceBaseUri + "/api/Roles/getUsersRole").then(function (response) {
            return response;
        });
    };


    return rolefactory;
}]);