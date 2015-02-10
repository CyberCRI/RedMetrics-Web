angular.module('search', [
    'search.form',
    'search.result'
])

    .factory('search', function ($filter, $state, backend, dataType) {
        var service = {};

        service.params = {};

        // These values are exposed to the GUI
        service.searchInProgress = false; // Is a search in progress?
        service.results = [];
        
        service.query = function () {
            if (service.isValid()) {
                backend.search(service.params)
                    .success(function (searchResults, status, headers) {
                        service.results = searchResults;
                        service.pageNumber = parseInt(headers("X-Page-Number")); 
                        service.pageCount = parseInt(headers("X-Page-Count"));
                    })
                    .error(function(data, status) { 
                        service.results = [];
                    })
                    .finally(function () {
                        service.searchInProgress = false; // No longer searching 
                    });

                // Indicate that we are searching
                service.searchInProgress = true; 
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