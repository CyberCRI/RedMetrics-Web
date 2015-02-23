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