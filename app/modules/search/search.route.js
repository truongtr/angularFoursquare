angular.module('search.module').config(function($httpProvider,$stateProvider, searchConfig,$urlRouterProvider) {

    $stateProvider
        .state('search', {
            url: "",
            templateUrl: searchConfig.viewPath+"search.html",
            controller : searchCtrl,
            resolve : {
            }
        })
        .state('searchString', {
            url: "/s/{searchString}",
            templateUrl: searchConfig.viewPath+"search.html",
            controller : searchCtrl,
            resolve : {
            }
        })
    $urlRouterProvider.otherwise('/s/');

    delete $httpProvider.defaults.headers.common["X-Requested-With"]

}).config( [
        '$compileProvider',
        function( $compileProvider )
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
    ])
