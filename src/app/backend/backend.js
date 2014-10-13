angular.module('backend', [])

    .constant('SERVER_URL', 'http://localhost:4567/v1/')
//    .constant('SERVER_URL', 'http://redmetrics.redwire.io/v1/')

    .factory('backend', function ($http, SERVER_URL, formConfig, dataType) {
        var service = {};

        service.loadGames = function () {
            $http.get(SERVER_URL + 'game/')
                .success(pushGamesToForm);
        };

        var pushGamesToForm = function (games) {
            angular.forEach(games, function (game) {
                formConfig.selectableGames.push({name: game.name, value: game.id });
            });
        };

        service.loadGameVersions = function (gameId) {
            if (!gameId) return;
            return $http.get(SERVER_URL + 'game/' + gameId + '/versions')
                .success(pushGameVersionsToForm);
        };

        var pushGameVersionsToForm = function (gameVersions) {
            angular.forEach(gameVersions, function (gameVersion) {
                formConfig.selectableGameVersions.push({name: gameVersion.id, value: gameVersion.id });
            });
        };

        service.search = function (params) {
            return $http.get(SERVER_URL + dataType.selected, {params: params});
        };

        return service;
    });