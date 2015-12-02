
angular.module('search.module').directive('myEnter', myEnter);

function myEnter() {
    return function (scope, element, attrs) {

        // Search when click enter
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.search();
                });

                event.preventDefault();
            }

        });
       // element.focus();

    };


}
