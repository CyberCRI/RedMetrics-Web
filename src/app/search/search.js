angular.module('search', [
    'search.form',
    'search.result'
])

    .constant('DATE_FORMAT', "EEE, dd MMM yyyy HH:mm:ss 'UTC'")

    .factory('search', function ($filter, backend, dataType, DATE_FORMAT) {
        var service = {};

        service.dataType = '';

        var now = new Date();
        var millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
        var lastWeekInMilliseconds = now.getTime() - millisecondsInWeek;
        var aWeekAgo = new Date();
        aWeekAgo.setTime(lastWeekInMilliseconds);
        service.params = {
            after: aWeekAgo,
            before: now
        };

        service.results = {};
        service.query = function () {
            if (service.isValid()) {
                var params = angular.copy(service.params);
                var dateFilter = $filter('date');
                params.after = dateFilter(params.after, DATE_FORMAT);
                params.before = dateFilter(params.before, DATE_FORMAT);
                params.afterUserTime = dateFilter(params.afterUserTime, DATE_FORMAT);
                params.beforeUserTime = dateFilter(params.beforeUserTime, DATE_FORMAT);
                backend.search(params)
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