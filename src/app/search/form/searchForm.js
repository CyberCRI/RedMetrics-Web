angular.module('search.form', [
    'formly'
])

    .value('formConfig', {
        selectableGames: []
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

    .controller('SearchFormCtrl', function ($scope, formConfig, dataType, search) {
        $scope.search = search;
        $scope.form = {
            fields: [
                {
                    "key": "game",
                    "type": "select",
                    "label": "Game",
                    "options": formConfig.selectableGames
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
                    key: 'sections',
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

    .run(function (backend, formConfig) {
        backend.loadGames()
            .success(function (games) {
                angular.forEach(games, function (game) {
                    formConfig.selectableGames.push({name: game.name, value: game.id });
                });
            });
    });