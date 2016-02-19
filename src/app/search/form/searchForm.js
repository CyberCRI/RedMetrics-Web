angular.module('search.form', [
    'formly'
])

    .value('formConfig', {
        selectableGames: [],
        selectableGameVersions: []
    })

    .value('dataType', {
        selected: 'event'
    })

    .directive('typeSelector', function () {
        return {
            scope: {},
            restrict: 'E',
            controller: 'DataTypeSelectorCtrl',
            controllerAs: 'typeSelector',
            templateUrl: 'search/form/dataTypeSelector.html'
        };
    })

    .controller('DataTypeSelectorCtrl', function (dataType) {
        this.dataType = dataType;
    })

    .directive('searchForm', function () {
        return {
            scope: {},
            restrict: 'E',
            controller: 'SearchFormCtrl',
            templateUrl: 'search/form/searchParamsForm.html'
        };
    })

    .controller('SearchFormCtrl', function ($scope, $state, $location, formConfig, dataType, backend) {
        PARAMETERS = ["game", "gameVersion", "player", "type", "section", "after", "before", 
            "afterUserTime", "beforeUserTime", "perPage"];
        DATE_PARAMETERS = ["after", "before", "afterUserTime", "beforeUserTime"]

        function formatDateAsIso(dateString) {
            if(!dateString) return null;

            // Read as local date but convert to UTC time
            var localDate = new Date(dateString);
            var utcDate = Date.UTC(localDate.getFullYear(), localDate.getMonth(), 
                localDate.getDate(), localDate.getHours(), localDate.getMinutes(), 
                localDate.getSeconds(), localDate.getMilliseconds());
            return new Date(utcDate).toISOString();
        }

        function readDateAsIso(dateString) {
            if(!dateString) return null;

            // Read as utc date but pretend it is a local date
            var localDate = new Date(dateString);
            return new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), 
                localDate.getUTCDate(), localDate.getUTCHours(), localDate.getUTCMinutes(), 
                localDate.getUTCSeconds(), localDate.getUTCMilliseconds());
        }

        function getQueryParam(key) {
            return $location.search().hasOwnProperty(key) ? $location.search()[key] : null;  
        } 

        $scope.search = function() {
            var params = angular.copy($scope.params);

            // Copy over the entity type
            params.entityType = dataType.selected;

            // Format dates in ISO format
            params.after = formatDateAsIso(params.after);
            params.before = formatDateAsIso(params.before);
            params.afterUserTime = formatDateAsIso(params.afterUserTime);
            params.beforeUserTime = formatDateAsIso(params.beforeUserTime);

            // Switching state triggers the search
            $state.go("search", params, { inherit: false });
        }

        // Setup the initial parameters with values taken from the query string, if provided
        $scope.params = {};
        PARAMETERS.forEach(function(paramName) {
            $scope.params[paramName] = getQueryParam(paramName);
        });
        // Convert date parameters to Date objects in local time
        DATE_PARAMETERS.forEach(function(paramName) {
            $scope.params[paramName] = readDateAsIso($scope.params[paramName]);
        });

        $scope.form = {
            fields: [
                {
                    key: "game",
                    type: "select",
                    label: "Game",
                    options: formConfig.selectableGames
                },
                {
                    key: "gameVersion",
                    type: "select",
                    label: "Game Version",
                    options: formConfig.selectableGameVersions,
                    watch: {
                        expression: function () {
                            return $scope.params.game !== undefined;
                        },
                        listener: function (field, _new) {
                            // Hide the game version if the game has not been chosen
                            field.hide = !_new;
                        }
                    }
                },
                {
                    key: 'player',
                    type: 'text',
                    label: 'Player',
                    placeholder: 'Player ID'
                },
                {
                    key: 'type',
                    type: 'text',
                    label: 'Type',
                    placeholder: 'Type'
                },
                {
                    key: 'section',
                    type: 'text',
                    label: 'Section',
                    placeholder: 'level1.section1.*'
                },
                {
                    key: "after",
                    type: "datetime-local",
                    label: "After (in server time)"
                },
                {
                    key: "before",
                    type: "datetime-local",
                    label: "Before (in server time)"
                },
                {
                    key: "afterUserTime",
                    type: "datetime-local",
                    label: "After (in player time)"
                },
                {
                    key: "beforeUserTime",
                    type: "datetime-local",
                    label: "Before (in player time)"
                },
                {
                    key: "perPage",
                    type: "text",
                    label: "Results per page (max 500)"
                }
            ],
            options: {
                uniqueFormId: 'searchParamsForm'
            }
        };

        // Load game versions as soon as a game is selected
        $scope.$watch('params.game', function () {
            backend.loadGameVersions($scope.params.game);
        });
    })

    .run(function (backend) {
        backend.loadGames();
    });