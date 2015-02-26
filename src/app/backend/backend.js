
angular.module('backend', [
    'backend.config'
])

    .factory('backend', function ($http, SERVER_URL, formConfig) {
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
                formConfig.selectableGameVersions.push({name: gameVersion.name, value: gameVersion.id });
            });
        };

        service.search = function (params) {
            return $http.get(SERVER_URL + params.entityType, {params: params});
        };

        service.createGame = function (name, author, description) {
            var data = {
                name: name,
                author: author,
                description: description
            };
            return $http.post(SERVER_URL + "game", data);
        };

        service.createGameVersion = function(gameId, name, description) {
            var data = {
                game: gameId,
                name: name,
                description: description
            };
            return $http.post(SERVER_URL + "gameVersion", data);
        };

        return service;
    });