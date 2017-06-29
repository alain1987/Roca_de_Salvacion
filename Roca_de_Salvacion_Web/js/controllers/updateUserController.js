'use strict';
app.controller('updateUserController', ['$scope', 'passDataService', '$timeout', 'roleService', '$mdDialog', 'usersService', '$location', 'infService',
    function ($scope, passDataService, $timeout, roleService, $mdDialog, usersService, $location, infService) {
    $scope.showHints = true;
    $scope.user = {};
    $scope.myUserRol = null;
    $scope.myUserRoles = [];
    $scope.editUserNameInput = true;
    $scope.oldRole = "";

    function act() {
        if (passDataService.get() == null) {
            $location.path('/roles');
            passDataService.set(null);
        } else {
            infService.getInfRule().then(function (response) {
                $scope.user = passDataService.get();
            }, function (error) {
                alert(error.data.message);
            });
        }        
    }
    act();

    $scope.tabName = 'userData';

    $scope.cancelModify = function () {
        $location.path('/roles');
        passDataService.set(null);
    };

    $scope.getTabName = function (name) {
        $scope.tabName = name;
    };


    //antiguo rol
    function oldRole(id) {
        return roleService.getRoleFromUser(id).then(function (response) {
            $scope.oldRole = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    };
    oldRole($scope.user.id);

    //Modificar Permisos y roles
    $scope.setUserRole = function (ev, user) {
        var confirm = $mdDialog.confirm()
                  .title('Confirma que desea cambiar el rol de ' + user.userName + '?')
                  .textContent('Esta accion generara cambios en los permisos del usuario')
                  .ariaLabel('AAA')
                  .targetEvent(ev)
                  .ok('Cambiar')
                  .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            roleService.setUserRole(user.id, $scope.oldRole, $scope.myUserRol).then(function (response) {
                    $location.path('/roles');
                }, function (response) {
                    var errors = [];
                    for (var key in response.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "No se actualizo debido a que:" + errors.join(' ');
                });
             

        });
    };

    //Modificar Password
    $scope.updateUserPassword = function (ev, id, userPassword, user) {
        var confirm = $mdDialog.confirm()
                  .title('Confirma que desea cambiar el password de ' + user.userName + '?')
                  .textContent('Esta accion generara cambios en la cuenta del usuario')
                  .ariaLabel('AAA')
                  .targetEvent(ev)
                  .ok('Cambiar')
                  .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            if (userPassword.confirmPassword == userPassword.password) {
                usersService.updateUserPassword(id, userPassword.password).then(function (response) {
                    $location.path('/roles');
                }, function (response) {
                    var errors = [];
                    for (var key in response.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "No se actualizo debido a que:" + errors.join(' ');
                });
            } else {
                $scope.showHints = false;
            }
           
        });
    };

    //Modificar segun datos
    $scope.updateDataUser = function (ev, user) {
        var confirm = $mdDialog.confirm()
                  .title('Confirma que desea cambiar los datos de '+user.userName+'?')
                  .textContent('Esta accion generara cambios en la cuenta del usuario')
                  .ariaLabel('AAA')
                  .targetEvent(ev)
                  .ok('Modificar')
                  .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            
            usersService.updateUser(user).then(function (response) {
                $location.path('/roles')
                //actualizar();
            }, function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "No se actualizo debido a que:" + errors.join(' ');
            });
        });
    };

    $scope.editUserName = function () {
        if ($scope.editUserNameInput == false) {
            $scope.editUserNameInput = true;
        }else
            $scope.editUserNameInput = false;
    };


    //Lista de roles
    $scope.loadRoles = function () {

        return $timeout(function () {

            roleService.getRoleNames().then(function (response) {
                var count = response.data.length;
                var oldRole = $scope.oldRole;
                for (var i = 0; i < count; i++) {
                    if (response.data[i] != oldRole) {
                        $scope.myUserRoles.push(response.data[i]);
                    }
                }
                return $scope.myUserRoles;
            }, function (error) {
                alert(error.data.message);
            });

        }, 650);
    };
}]);