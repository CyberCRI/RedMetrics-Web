angular.module('backend', [])

    .constant('SERVER_URL', 'http://localhost:4567/v1/')
//    .constant('SERVER_URL', 'http://redmetrics.redwire.io/v1/')

    .factory('backend', function ($http, SERVER_URL, formConfig, dataType) {
        var service = {};

        service.loadGames = function () {
            return $http.get(SERVER_URL + 'game/');
        };

        service.search = function (params) {
            return $http.get(SERVER_URL + dataType.selected, {params: params});
        };

        return service;
    });