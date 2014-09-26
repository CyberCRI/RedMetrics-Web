angular.module('search.result', [])

    .directive('searchResult', function () {
        return {
            scope: {},
            restrict: 'E',
            controller: function (search) {
                this.search = search;
            },
            controllerAs: 'ctrl',
            templateUrl: 'search/result/searchResult.html'
        };
    });