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
        function formatDate(dateString) {
            if(!dateString) return null;

            // Read as local date but convert to UTC time
            var localDate = new Date(dateString);
            var utcDate = Date.UTC(localDate.getFullYear(), localDate.getMonth(), 
                localDate.getDate(), localDate.getHours(), localDate.getMinutes(), 
                localDate.getSeconds(), localDate.getMilliseconds());
            return new Date(utcDate).toISOString();
        }

        function getQueryParam(key) {
            return $location.search().hasOwnProperty(key) ? $location.search()[key] : null;  
        } 

        $scope.search = function() {
            var params = angular.copy($scope.params);

            // Copy over the entity type
            params.entityType = dataType.selected;

            // Format dates in ISO format
            params.after = formatDate(params.after);
            params.before = formatDate(params.before);
            params.afterUserTime = formatDate(params.afterUserTime);
            params.beforeUserTime = formatDate(params.beforeUserTime);

            // Switching state triggers the search
            $state.go("search", params, { inherit: false });
        }

        $scope.params = {
            game: getQueryParam("game"),
            gameVersion: getQueryParam("gameVersion"),
            player: getQueryParam("player"),
            type: getQueryParam("type"),
            section: getQueryParam("section")
        };

        $scope.$watch('params.game', function () {
            backend.loadGameVersions($scope.params.game);
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
                    placeholder: 'Event type',
                    watch: {
                        expression: function () {
                            return dataType.selected === 'event';
                        },
                        listener: function (field, _new) {
                            field.hide = !_new;
                        }
                    }
                },
                {
                    key: 'section',
                    type: 'text',
                    label: 'Section',
                    placeholder: 'level1.section1.*'
                }
            ],
            options: {
                uniqueFormId: 'searchParamsForm'
            }
        };
    })

    .run(function (backend) {
        backend.loadGames();
    });