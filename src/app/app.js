angular.module('app', [
    'ui.utils',
    'ui.router',
    'formly',
    'header',
    'search',
    'backend'
])

    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });