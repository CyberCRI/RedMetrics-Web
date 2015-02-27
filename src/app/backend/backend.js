
angular.module('backend', [
    'backend.config'
])

    .factory('backend', function ($http, SERVER_URL, formConfig) {
        var service = {};

        service.loadGames = function () {
            var games = [];

            var onPageLoaded = function(results, status, headers) {
                // Add games to the local list
                games = games.concat(results);

                // Get the pagination info
                var pageNumber = parseInt(headers("X-Page-Number")); 
                var pageCount = parseInt(headers("X-Page-Count"));

                // If we are done, write out the games to the form
                if(pageNumber == pageCount) return pushGamesToForm(games);
                // Otherwise request another page
                else return $http.get(SERVER_URL + "game?page=" + (pageNumber + 1)).success(onPageLoaded);
            };

            return $http.get(SERVER_URL + 'game').success(onPageLoaded);
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