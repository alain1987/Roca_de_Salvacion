'use strict';

app.factory('galleryAction', function () {
    var galleryAction = {};
    var savedData = {};

    galleryAction.set = function (object) {
        savedData = object;
    };

    galleryAction.get = function () {
        if (savedData.action != "update" && savedData.action != "add" && savedData.action != "createBlog" && savedData.action != "updateBlog" && savedData.action != "updateBlogNews" && savedData.action != "addBlogNews" && savedData.action != "updateMyBlog") {
            savedData.action = "delete";
            return savedData;
        } else {
            return savedData;
        }
       
    };

    return galleryAction;
});