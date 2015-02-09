angular.module('search', [
    'search.form',
    'search.result'
])

    .constant('DATE_FORMAT', "EEE, dd MMM yyyy HH:mm:ss 'UTC'")

    .factory('search', function ($filter, $state, backend, dataType, DATE_FORMAT) {
        var service = {};

        service.params = {};

        // These values are exposed to the GUI
        service.searchInProgress = false; // Is a search in progress?
        service.results = [];
        
        function makeLinkMap(linkHeader) {
            // Expecting a header like "http://localhost:5050/v1/event/?page=1&perPage=50; rel=next, http://localhost:5050/v1/event/?page=9&perPage=50; rel=last"
            // link.split(",")[0].split(";")[1].trim().split("=")[1]
            var linkMap = {};
            var links = linkHeader.split(",");
            for(var i = 0; i < links.length; i++) {
                var linkDesc = links[i].split(";");
                // On the left, the part of linkDesc after rel=
                linkMap[linkDesc[1].split("=")[1].trim()] = linkDesc[0].trim();
            }
            return linkMap;
        }

        service.query = function () {
            if (service.isValid()) {
                var params = angular.copy(service.params);
                var dateFilter = $filter('date');
                params.after = dateFilter(params.after, DATE_FORMAT);
                params.before = dateFilter(params.before, DATE_FORMAT);
                params.afterUserTime = dateFilter(params.afterUserTime, DATE_FORMAT);
                params.beforeUserTime = dateFilter(params.beforeUserTime, DATE_FORMAT);

                backend.search(params)
                    .success(function (searchResults, status, headers) {
                        service.results = searchResults;
                        service.linkMap = makeLinkMap(headers("link"));
                        service.pageNumber =  headers("X-Page-Number"); 
                        service.totalPages = headers("X-Page-Count");
                    })
                    .error(function(data, status) { 
                        service.results = [];
                    })
                    .finally(function () {
                        service.searchInProgress = false; // No longer searching 
                    });

                // Indicate that we are searching
                service.searchInProgress = true; 
                // Switch to show search results
                $state.go('search');
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