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
        
        function makeLinkMap(linkHeader) {
            if(!linkHeader) return {};

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
                backend.search(service.params)
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