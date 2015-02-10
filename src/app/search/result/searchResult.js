angular.module('search.result', [])
    .controller("SearchResultController", function ($scope, $state, $stateParams, search) {
        $scope.search = search;


        $scope.goToPage = function(pageNumber) {
            var newParams = angular.extend({}, $stateParams, {
                page: pageNumber
            });
            $state.go("search", newParams, { inherit: false });
        };

        search.params = $stateParams;
        search.query(); 
    });