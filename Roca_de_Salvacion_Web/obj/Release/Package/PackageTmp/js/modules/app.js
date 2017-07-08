'use strict';
var app = angular.module('app',
    ['ngRoute', 'angular-loading-bar', 'ui.bootstrap', 'ngAnimate', 'LocalStorageModule', 'ngMaterial','ngMdIcons', 'ngSanitize', 'datatables']);
app.config(['$routeProvider',/* '$locationProvider',*/ function ($routeProvider/*, $locationProvider*/) {
    /*$locationProvider.hashPrefix*/
        $routeProvider.when('/', {
            templateUrl: '/js/views/home/Home.html',
            controller: 'homeController'
        }).when('/unauthorized', {
            templateUrl: '/js/views/authentication/unauthorized.html',
            controller: 'unauthorizedController'
        }).when('/logout', {
            templateUrl: '/js/views/authentication/logout.html',
            controller: 'logoutController'
        }).when('/home', {
            templateUrl: '/js/views/home/Home.html',
            controller: 'homeController'
        }).when('/login', {
            templateUrl: '/js/views/authentication/login.html',
            controller: 'loginController'
        }).when('/signup', {
            templateUrl: '/js/views/authentication/signup.html',
            controller: 'signupController'
        }).when("/inf", {
            controller: "infController",
            templateUrl: "/js/views/information/inf.html"
        }).when("/infPlus", {
            controller: "infPlusController",
            templateUrl: "/js/views/information/infPlus.html"
        }).when("/refresh", {
            controller: "refreshController",
            templateUrl: "/js/views/authentication/refresh.html"
        }).when("/tokens", {
            controller: "tokensManagerController",
            templateUrl: "/js/views/authentication/tokens.html"
        }).when("/associate", {
            controller: "associateController",
            templateUrl: "/js/views/authentication/associate.html"
        }).when("/forgotPassword", {
            controller: "forgotPasswordController",
            templateUrl: "/js/views/authentication/forgotPassword.html"
        }).when("/changePassword", {
            controller: "changePasswordController",
            templateUrl: "/js/views/authentication/changePassword.html"
        }).when("/roles", {
            controller: "roleController",
            templateUrl: "/js/views/authentication/roles.html"
        }).when("/updateUser", {
            controller: "updateUserController",
            templateUrl: "/js/views/authentication/updateUser.html"
        }).when("/fileUpload", {
            controller: "fileUpController",
            templateUrl: "/js/views/news/fileUpload.html"
        }).when("/manageNews", {
            controller: "manageNewsController",
            templateUrl: "/js/views/news/manageNews.html"
        }).when("/gallery", {
            controller: "galleryController",
            templateUrl: "/js/views/news/gallery.html"
        }).when("/showAtGallery", {
            controller: "showAtGalleryController",
            templateUrl: "/js/views/news/showAtGallery.html"
        }).when("/showImgAtHome", {
            controller: "showImgAtHomeController",
            templateUrl: "/js/views/news/showImgAtHome.html"
        }).when("/showGallery", {
            controller: "showGalleryController",
            templateUrl: "/js/views/news/showGallery.html"
        }).when("/addNews", {
            controller: "newsController",
            templateUrl: "/js/views/news/addNews.html"
        }).when("/updateNews", {
            controller: "updateNewsController",
            templateUrl: "/js/views/news/updateNews.html"
        }).when("/allNews", {
            controller: "allNewsController",
            templateUrl: "/js/views/news/allNews.html"
        }).when("/manageVideos", {
            controller: "manageVideosController",
            templateUrl: "/js/views/videos/manageVideos.html"
        }).when("/showVideos", {
            controller: "showVideosController",
            templateUrl: "/js/views/videos/showVideos.html"
        })/*.when("/updateVideo", {
            controller: "updateVideoController",
            templateUrl: "/js/views/videos/updateVideo.html"
        })*/.when("/chat", {
            controller: "chatController",
            templateUrl: "/js/views/chat/chat.html"
        }).when("/addBlogNews", {
            controller: "addBlogNewsController",
            templateUrl: "/js/views/blogs/addBlogNews.html"
        }).when("/adminBlogs", {
            controller: "adminBlogsController",
            templateUrl: "/js/views/blogs/adminBlogs.html"
        }).when("/blog", {
            controller: "blogController",
            templateUrl: "/js/views/blogs/blog.html"
        }).when("/updateBlogNews", {
            controller: "updateBlogNewsController",
            templateUrl: "/js/views/blogs/updateBlogNews.html"
        }).when("/updateBlogSettings", {
            controller: "updateBlogSettingsController",
            templateUrl: "/js/views/blogs/updateBlogSettings.html"
        }).when("/updateMyBlogSettings", {
            controller: "updateMyBlogSettingsController",
            templateUrl: "/js/views/blogs/updateMyBlogSettings.html"
        }).when("/createBlog", {
            controller: "createBlogController",
            templateUrl: "/js/views/blogs/createBlog.html"
        }).when("/chooseBlog", {
            controller: "chooseBlogController",
            templateUrl: "/js/views/blogs/chooseBlog.html"
        }).when("/adminBlogNews", {
            controller: "adminBlogNewsController",
            templateUrl: "/js/views/blogs/adminBlogNews.html"
        }).otherwise({
            redirectTo: '/home'
        });
    }]);

//var serviceBase = 'http://localhost:15161';
    var serviceBase = 'http://rocadesalvacionapi.azurewebsites.net';

    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        clientId: 'angularPart'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);