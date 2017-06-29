'use strict';

app.controller('galleryController', ['$scope', 'galleryService', 'ngAuthSettings', 'passDataService', '$location', 'galleryAction','$mdDialog',
    function ($scope, galleryService, ngAuthSettings, passDataService, $location, galleryAction,$mdDialog) {
    $scope.images = null;
    $scope.base = ngAuthSettings.apiServiceBaseUri;
    $scope.animateClass = "page-enter";
    function images() {
        galleryService.getAllImages().then(function (response) {
            $scope.images = response.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

    images();

    $scope.upload = function () {
        $location.path('/fileUpload');
    };

    $scope.select = function (index,evt, image_src, name) {
        var g = galleryAction.get();
        if (g.action == "add") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea esta imagen para publicar su noticia?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Publicar')
              .cancel('Cancelar');
        
        $mdDialog.show(confirm).then(function() {
            passDataService.set(image_src);
            galleryAction.set({'action':""})
            $location.path('/addNews');
        }, function() {
            $location.path('/manageNews');
        });
        } else if (g.action == "update") {
            var confirm = $mdDialog.confirm()
             .title('Que accion realizara?')
             .textContent('Desea cambiar la imagen de su noticia?')
             .ariaLabel('dlknlkefnwel')
             .targetEvent(evt)
             .ok('Acualizar')
             .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                var myPic = passDataService.get();
                myPic.urlImagen = image_src;

                passDataService.set(myPic);
                galleryAction.set({ 'action': "" })
                $location.path('/updateNews');
            }, function () {
                $location.path('/manageNews');
            });
        }else if(g.action == "delete"){
            var confirm = $mdDialog.confirm()
             .title('Que accion realizara?')
             .textContent('Desea eliminar esta imagen?')
             .ariaLabel('dlknlkefnwel')
             .targetEvent(evt)
             .ok('Eliminar')
             .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                galleryService.deleteImage(name).then(function (response) {
                    $scope.images.splice(index, 1);
                });
            }, function () {
                    $mdDialog.cancel();
            });
        } else if (g.action == "createBlog") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea usar esta imagen para poner en la portada de su blog?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Usar')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                passDataService.set(image_src);
                galleryAction.set({ 'action': "" })
                $location.path('/createBlog');
            }, function () {
                $location.path('/adminBlogs');
            });
        } else if (g.action == "updateBlog") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea usar esta imagen cambiar portada de su blog?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Usar')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                var oldBlog = passDataService.get();
                oldBlog.mainUrlPicture = image_src;
                galleryAction.set({ 'action': "" })
                $location.path('/updateBlogSettings');
            }, function () {
                $location.path('/adminBlogs');
            });
        } else if (g.action == "updateMyBlog") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea usar esta imagen cambiar portada de su blog?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Usar')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                var oldBlog = passDataService.get();
                oldBlog.mainUrlPicture = image_src;
                galleryAction.set({ 'action': "" })
                $location.path('/updateMyBlogSettings');
            }, function () {
                $location.path('/inf');
            });
        } else if (g.action == "addBlogNews") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea usar esta imagen para publicar como noticia en su blog?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Usar')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                passDataService.set(image_src);
                galleryAction.set({ 'action': "" })
                $location.path('/addBlogNews');
            }, function () {
                $location.path('/adminBlogNews');
            });
        } else if (g.action == "updateBlogNews") {
            var confirm = $mdDialog.confirm()
              .title('Que accion realizara?')
              .textContent('Desea cambiar la imagen de la noticia blog?')
              .ariaLabel('dlknlkefnwel')
              .targetEvent(evt)
              .ok('Cambiar')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                var oldBlog = passDataService.get();
                oldBlog.mainUrlPicture = image_src;
                galleryAction.set({ 'action': "" })
                $location.path('/updateBlogNews');
            }, function () {
                $location.path('/adminBlogNews');
            });
        }

    };


    $scope.home = function () {
        $location.path('/home');
        passDataService.set(null);
    };
    
    $scope.begin = function () {
        $location.path('/showImgAtHome');
        passDataService.set(null);
    };

    $scope.users = function () {
        $location.path('/showAtGallery');
        passDataService.set(null);
    };
        //Dependiendo de la accion se levantara un dialogo
   /* $scope.select = function (image_src) {
        passDataService.set(image_src);
        $location.path('/addNews');
    };*/
}]);