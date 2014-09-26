angular.module('search', [
    'search.form',
    'search.result'
])

    .factory('search', function (backend, dataType) {
        var service = {};

        service.dataType = '';
        service.params = {};
        service.results = {};
        service.query = function () {
            if (service.isValid()) {
                backend.search(service.params)
                    .success(function (searchResults) {
                        service.results = searchResults;
                    });
            }
        };
        service.isValid = function () {
            if (dataType.selected === '') return false;
            var valid = false;
            angular.forEach(service.params, function (element) {
                if (element) valid = true;
            });
            return valid;
        };

        return service;
    });