angular.module('app', [
    'ui.utils',
    'ui.router',
    'formly',
    'header',
    'search',
    'backend',
    'admin',
    'material.components.linearProgress',
    'chart.js'
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
            url: "/search?page&perPage&game&gameVersion&entityType&player&type&section&after&before&afterUserTime&beforeUserTime",
            templateUrl: "search/result/searchResult.html",
            controller: "SearchResultController"
        });
    })
    // Setup a input template for datetimes (copied from formly.vanilla and adapter for dates)
    .config(function(formlyConfigProvider) {
        formlyConfigProvider.setTemplate({
            "datetime-local": "<div><label for={{id}}>{{options.label || 'Text'}} {{options.required ? '*' : ''}}</label><input type=datetime-local id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators placeholder={{options.placeholder}} aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-model=\"result[options.key || index]\"><p id={{id}}_description ng-if=options.description>{{options.description}}</p></div>"
        });
    });
