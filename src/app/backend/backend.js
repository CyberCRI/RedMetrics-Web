
angular.module('backend', [
    'backend.config'
])

    .factory('backend', function ($http, SERVER_URL, formConfig, dataType) {
        var service = {};

        service.loadGames = function () {
            $http.get(SERVER_URL + 'game/')
                .success(pushGamesToForm);
        };

        var pushGamesToForm = function (games) {
            while(formConfig.selectableGames.length > 0) {
                formConfig.selectableGames.pop();
            }
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
            while(formConfig.selectableGameVersions.length > 0) {
                formConfig.selectableGameVersions.pop();
            }
            angular.forEach(gameVersions, function (gameVersion) {
                formConfig.selectableGameVersions.push({name: gameVersion.id, value: gameVersion.id });
            });
        };

        service.search = function (params) {
            return $http.get(SERVER_URL + dataType.selected, {params: params});
        };

        service.createGame = function (name, description) {
            var data = {
                name: name,
                description: description
            };
            return $http.post(SERVER_URL + "game/", data);
        };

        service.createGameVersion = function(gameId) {

        };

        return service;
    });