/**
 * Created by truc on 23/11/15.
 */
describe('Controller: searchCtrl', function() {
// Instantiate a new version of my module before each test
    beforeEach(module('search.module'));
    var ctrl;
    // Before each unit test, instantiate a new instance
    // of the controller
    beforeEach(inject(function ($controller) {

        ctrl = $controller('searchCtrl');
    }));

    it('should have items available on load', function () {
       

    });
})