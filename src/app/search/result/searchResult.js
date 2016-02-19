angular.module('search.result', [])
    .controller("SearchResultController", function ($scope, $state, $stateParams, search, SERVER_URL) {
        function makeCsvDownloadUrl() {
            var args = [];
            for(var key in $stateParams) {
                if(!$stateParams[key]) continue;

                args.push(key + "=" + $stateParams[key]);
            }
            return encodeURI(SERVER_URL + $stateParams.entityType + ".csv?" + args.join("&"));
        }

        $scope.search = search;

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.goToPage = function(pageNumber) {
            var newParams = angular.extend({}, $stateParams, {
                page: pageNumber
            });
            $state.go("search", newParams, { inherit: false });
        };

        $scope.csvDownloadUrl = makeCsvDownloadUrl();

        search.params = $stateParams;
        search.query(); 

    });