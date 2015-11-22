
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
            if(event.which!=8){


                console.log(event.which );
            }

        });
        element.focus();

    };


}
