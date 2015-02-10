angular.module('app', [
    'ui.utils',
    'ui.router',
    'formly',
    'header',
    'search',
    'backend',
    'admin',
    'material.components.linearProgress'
])

    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/",
            templateUrl: "home/home.html"
        }); 

        $stateProvider.state("adminGame", {
            url: "/admin/game",
            templateUrl: "admin/game.html",
            controller: "AdminGameCtrl"
        });

        $stateProvider.state("adminGameVersion", {
            url: "/admin/gameVersion",
            templateUrl: "admin/gameVersion.html",
            controller: "AdminGameVersionCtrl"
        });

        $stateProvider.state("search", {
            url: "/search?gameVersion&entityType&player&type&section&after&before&afterUserTime&beforeUserTime",
            templateUrl: "search/result/searchResult.html",
            controller: "SearchResultController"
        });
    });
