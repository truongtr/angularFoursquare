var app = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'angular-loading-bar',
    'ngTouch',
    'angularjs-foursquare'
]);

app.constant('API', {

    url: 'https://api.foursquare.com/v2/venues/search?client_id='+client_id+'&client_secret='+client_secret+'', 

});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'FFEBEE',
        '100': 'FFCDD2',
        '200': 'EF9A9A',
        '300': 'E57373',
        '400': 'EF5350',
        '500': 'F44336',
        '600': 'E53935',
        '700': 'D32F2F',
        '800': 'C62828',
        '900': 'B71C1C',
        'A100': 'FF8A80',
        'A200': 'FF5252',
        'A400': 'FF1744',
        'A700': 'D50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('amazingPaletteName')
});


// using jquery inside angular without conflict
// Use $jq instead of $

var $jq = jQuery.noConflict();


// Lazy console.log
function d($v){
    console.log($v);
}