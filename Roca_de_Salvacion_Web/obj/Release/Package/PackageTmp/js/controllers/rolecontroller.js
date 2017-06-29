'use strict';
app.controller('roleController', ['$scope', 'roleService', 'usersService', '$q', '$mdDialog', '$location', 'passDataService', function ($scope, roleService, usersService, $q, $mdDialog, $location, passDataService) {
    $scope.roles = [];
    $scope.usuarios = [];
    $scope.message = "";
    $scope.showRoles = false;
    $scope.roleSelect = "";
    $scope.animateClass = "page-enter";

    actualizar();
    usuariosTemp();

    function usuariosTemp() {
        usersService.getUsers().then(function (response) {
            $scope.usuarios = response.data;
            
        }, function (error) {
            alert(error.data.message);
        });
    }

    function actualizar() {
        $scope.roles = roleService.getUsersRole().then(function (response) {
            $scope.roles = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }
    
    $scope.allRoles = function () {
        roleService.retrieveRole.then(function (response) {
            if (response.data == null) {
                $scope.showRoles = false;
            } else {
                actualizar();
                $scope.showRoles = true;
            }
        },function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "No se creo el rol debido a que:" + errors.join(' ');
        });
    };

    $scope.addRole = function (role) {
        roleService.addRole(role).then(function (response) {
            actualizar();
        },
        function (err) {
            if (err.status == 400) {
                alert("El rol ya existe");
            }
        });
    };
    //Dialogo para confirmar eliminar
        $scope.showDelete = function (ev,id,index) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Desea eliminar este usuario?')
                  .textContent('No se podra recuperar el usuario borrado')
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Eliminar')
                  .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                usersService.deleteUser(id).then(function (response) {
                    $scope.roles.splice(index, 1);
                    $scope.status = 'Has eliminado el usuario';
                }, function() {
                    alert('No se pudo eliminar');
                });
            });
        };

      
        $scope.openEditUser = function (ev, index) {
            var user = {};
            var i = parseInt(index);
            return usersService.getUser($scope.roles[i].userId).then(function (response) {
                user = response.data;
                passDataService.set(user);
                $location.path('/updateUser');
               // return user;
            }, function (error) {
                alert("No existe ese usuario por: " + error);
            });
           
        };

        $scope.home = function () {
            $location.path('/home');
            passDataService.set(null);
        };
}]);