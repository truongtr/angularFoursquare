/**
 * Created by truc on 22/11/15.
 */
angular.module('card.module').directive('myCustomer', myCustomer);

function myCustomer(cardConfig, $rootScope) {

    var card = 'card.html';
    return {
        restrict: 'E',
        replace: false,
        templateUrl: cardConfig.viewPath + card
    };
}
