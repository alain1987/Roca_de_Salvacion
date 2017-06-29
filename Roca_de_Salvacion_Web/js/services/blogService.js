'use strict';

app.factory('blogService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var blogService = {};
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    //Obtener todos los blogs
    blogService.getAllBlogs = function () {
        return $http.get(serviceBase + '/api/Blog/getAllBlogs').then(function (response) {
            return response;
        });
    };
    //Adicionar un blog
    blogService.createBlog = function (blog) {
        return $http.post(serviceBase + '/api/Blog/createBlog', blog).then(function (response) {
            return response;
        });
    };

    //Eliminar un blog entero
    blogService.deleteBlog = function (id) {
        return $http.delete(serviceBase + '/api/Blog/deleteBlog', { params: { 'id': id } }).then(function (response) {
            return response;
        });
    };

    //Modificar un blog
    blogService.updateBlog = function (blog) {
        return $http.put(serviceBase + '/api/Blog/updateBlog', blog).then(function (response) {
            return response;
        });
    };

    blogService.search = function () {
        return $http.get(serviceBase + '/api/Blog/search').then(function (response) {
            return response;
        });
    };

    //Modificar Settings del Blog-->get
    blogService.getMyBlogSettings = function (userName) {
        return $http.get(serviceBase + '/api/Blog/getMyBlogSettings', { params: { 'userName': userName } }).then(function (response) {
            return response;
        });
    };

    //Blog Owners
    blogService.getBlogOwners = function () {
        return $http.get(serviceBase + '/api/Blog/getBlogOwners').then(function (response) {
            return response;
        });
    };

    //Para obtener Blog Settings
    blogService.getMyBlog = function (name) {
        return $http.get(serviceBase + '/api/Blog/getMyBlog?name='+name).then(function (response) {
                return response;
            });
    };

    //noticias para los usuarios
    blogService.getBlogNews = function (name){
        return $http.get(serviceBase + '/api/Blog/getMyBlogNews?name=' + name).then(function (response) {
            return response;
        });
    };

    //Lista parael dueno del blog
    blogService.getTheBlogNews = function (username) {
        return $http.get(serviceBase + '/api/Blog/getMemberBlogNews?userName=' + username).then(function (response) {
            return response;
        });
    };

    //Anadir noticia al blog
    blogService.addBlogNews = function (blogNews) {
        return $http.post(serviceBase + '/api/Blog/addBlogNews', blogNews).then(function (response) {
            return response;
        });
    };

    blogService.deleteBlogNews = function (id) {
        return $http.delete(serviceBase + '/api/Blog/deleteNewsBlog', { params: { 'id': id } }).then(function (response) {
            return response;
        });
    };

    blogService.updateBlogNews = function (blogNews) {
        return $http.put(serviceBase + '/api/Blog/updateBlogNews', blogNews).then(function (response) {
            return response;
        });
    };

    return blogService;
}]);