angular.module('search.result', [])
    .controller("SearchResultController", function ($scope, search) {
        $scope.search = search;
    });