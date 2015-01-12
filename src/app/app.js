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
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/",
            templateUrl: "home/home.html"
        });

        $stateProvider.state("search", {
            url: "/search",
            templateUrl: "search/result/searchResult.html",
            controller: function (search) {
                this.search = search;
            }
        });
    });
