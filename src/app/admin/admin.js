angular.module('admin', [])
    .controller('AdminCtrl', function ($scope, backend) {
        $scope.gameMeta = {
            name: "",
            description: ""
        };
        $scope.error = null;

        $scope.createGame = function() {
            if(!$scope.form.$valid) return false;

            $scope.results = {};
            $scope.error = null;

            var future = backend.createGame($scope.gameMeta.name, $scope.gameMeta.description);
            future.success(function(data) {
                $scope.results = data;
            });
            future.error(function(data) {
                $scope.error = "An error occured: " + data;
            });
        };

    });
