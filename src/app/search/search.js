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
    service.binValues = [];
    service.binLabels = [];
    
    service.query = function () {
        if (!service.isValid()) return;

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
        service.searchInProgressc = true; 

        backend.searchBinCounts(service.params)
        .success(function (binCounts) {
            service.binValues = [];
            service.binLabels = [];

            // chartData is array within an array
            service.binValues.push([])
            for(var i = 0; i < binCounts.length; i++) {
                service.binValues[0].push(binCounts[i].count);
                service.binLabels.push(i % 5 == 0 ? binCounts[i].date : "");
            }
        });
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