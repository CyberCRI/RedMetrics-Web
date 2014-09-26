angular.module('header', [])

    .directive('header', function () {
        return {
            controller: 'HeaderCtrl',
            controllerAs: 'header',
            templateUrl: 'header/header.html'
        };
    })

    .controller('HeaderCtrl', function () {
        this.message = 'Header Toolbar';
    });