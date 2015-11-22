angular.module('search.module').directive('venueCard', venueCard);
angular.module('search.module').directive('myEnter', myEnter);

function myEnter() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.search();
                });

                event.preventDefault();
            }
        });
    };
}
function venueCard(searchConfig, $rootScope){
    var card = 'card.html';
    return {
        restrict: 'E',
        scope: {
            myVenue: '='
        },
        controller:'cardCtrl',
        templateUrl: searchConfig.viewPath + card
        //template: '<div>Hello, {{myVenue.name}}!</div>'
    };
}
