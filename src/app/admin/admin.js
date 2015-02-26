angular.module('admin', [])
    .controller('AdminGameCtrl', function ($scope, backend) {
        $scope.gameMeta = {
            name: "",
            description: ""
        };
        $scope.error = null;

        $scope.createGame = function() {
            if(!$scope.form.$valid) return false;

            $scope.results = {};
            $scope.error = null;

            var future = backend.createGame($scope.gameMeta.name, $scope.gameMeta.author, $scope.gameMeta.description);
            future.success(function(data) {
                $scope.results = data;
            });
            future.error(function(data) {
                $scope.error = "An error occured: " + data;
            });
        };
    })
    .controller('AdminGameVersionCtrl', function ($scope, backend) {
        $scope.gameVersionMeta = {
            gameId: "",
            name: "",
            description: ""
        };
        $scope.error = null;

        $scope.createGameVersion = function() {
            if(!$scope.form.$valid) return false;

            $scope.results = {};
            $scope.error = null;

            var future = backend.createGameVersion($scope.gameVersionMeta.gameId, $scope.gameVersionMeta.name, $scope.gameVersionMeta.description);
            future.success(function(data) {
                $scope.results = data;
            });
            future.error(function(data) {
                $scope.error = "An error occured: " + data;
            });
        };
    });
