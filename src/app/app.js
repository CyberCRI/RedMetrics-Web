angular.module('app', [
    'ui.utils',
    'ui.router',
    'formly',
    'header',
    'search',
    'backend',
    'admin'
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
            controller: "AdminCtrl"
        });

        $stateProvider.state("search", {
            url: "/search",
            templateUrl: "search/result/searchResult.html",
            controller: function (search) {
                this.search = search;
            }
        });
    });
