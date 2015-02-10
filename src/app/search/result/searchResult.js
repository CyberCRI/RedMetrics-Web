angular.module('search.result', [])
    .controller("SearchResultController", function ($scope, $stateParams, search) {
        $scope.search = search;

        search.params = $stateParams;
        search.query(); 
    });