angular.module('search.module').controller('searchCtrl',['$rootScope','$scope','$http','API','$location','$stateParams','NgMap','$state',searchCtrl]);


function searchCtrl($rootScope, $scope, $http,API,$location,$stateParams,NgMap,$state){
    // variables
    $scope.search = search;
    $scope.searchString ="";
    $scope.lat = localStorage.getItem("userLat");;
    $scope.lng = localStorage.getItem("userLng");
    $scope.searchString = $stateParams.searchString;


    // Update user location and save it to localstorage so that it's faster next time
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.position = position;
                localStorage.setItem("userLat", position.coords.latitude);
                localStorage.setItem("userLng", position.coords.longitude);

                if( $scope.lat ==null || $scope.lat==null ||  $scope.lat != position.coords.latitude ){
                    $scope.lat = position.coords.latitude;
                    $scope.lng= position.coords.longitude;
                }

            });
        });
    }


    // Search if the the user paste the link
    if($scope.searchString != null){

        search();
    }

    var self = this;


    function search() {

        // Change URL location
        // Remove this to increase speed
       // $location.path('/s/'+$scope.searchString);
        
        // Data for sending to the API
        var data = {
            query: $scope.searchString,
            client_id: API.clientId,
            client_secret: API.clientSecret,
            v: '20151101',
            ll:$scope.lat+","+$scope.lng,

        }

        // Encode URI for the URL
        var strData = Object.keys(data).map(function(key){
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');

        // GET request
        $http.get(API.url + API.search+ strData).success(function(data, status, headers, config){

            if (status==200) {
                $scope.venues = data.response.venues;

                // Loops through the venues to measure the distance from current location
                for(var i=0; i<$scope.venues.length;i++){

                    // New data
                    var dataImage = {
                        client_id: API.clientId,
                        client_secret: API.clientSecret,
                        v: '20151101',
                        limit: 1
                    }

                    // Distance
                    var totalDistance = 0;
                    var R = 6378137; // Earth’s mean radius in meter
                    var dLat = $scope.rad($scope.lat - $scope.venues[i].location.lat);
                    var dLong = $scope.rad($scope.lng - $scope.venues[i].location.lng);

                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos($scope.rad($scope.lat)) * Math.cos($scope.venues[i].location.lat) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                    a = Math.abs(a);

                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    totalDistance =  R * c / 1000; //distance in Km
                    totalDistance = Math.round(totalDistance*10)/10;
                    $scope.venues[i].distance = totalDistance;


                }


            } else {

            }
        });

        $scope.rad = function(x) {
            return x * Math.PI / 180;
        };

    }

    // Watch searchString
    $scope.$watch('searchString', function (newValue, oldValue) {
        if(newValue!= null){
            if(newValue.length>oldValue.length){
                $scope.search();
            }
        }


    })


}
