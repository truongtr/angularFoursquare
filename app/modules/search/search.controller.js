angular.module('search.module').controller('searchCtrl',['$rootScope','$scope','$http','API','$location','$stateParams','NgMap',searchCtrl]);

angular.module('search.module').controller('cardCtrl',['$rootScope','$scope','$http','API','$location','$stateParams','NgMap',cardCtrl]);

function searchCtrl($rootScope, $scope, $http,API,$location,$stateParams,NgMap){
    $scope.search = search;
    $scope.lat = localStorage.getItem("userLat");;
    $scope.lng = localStorage.getItem("userLng");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.position = position;
                localStorage.setItem("userLat", position.coords.latitude);
                localStorage.setItem("userLng", position.coords.longitude);
                if( $scope.lat ==null || $scope.lat==null ||  $scope.lat != position.coords.latitude ){
                    $scope.lat = position.coords.latitude;
                    $scope.lng= position.coords.longitude;
                   // search();
                }
                d("Get location");
            });
        });
    }
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });

    $scope.searchString = $stateParams.searchString;
    if($scope.searchString.length>0){

        search();
    }

    var self = this;

    function search() {

        // Change URL location
        $location.url('/s/'+$scope.searchString);

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
                for(var i=0; i<$scope.venues.length;i++){
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
                    //partialDistance[i] = R * c / 1000;
                    $scope.venues[i].distance = totalDistance;
                  //  d($scope.venues[i].name+" "+totalDistance + "km")


                    // Encode URI for the URL
                    var strData = Object.keys(dataImage).map(function(key){
                        return encodeURIComponent(key) + '=' + encodeURIComponent(dataImage[key]);
                    }).join('&');

                    $http.get(API.url + "/"+$scope.venues[i].id +"/photos?"+ strData).success(function(data2, status2, headers2, config2){
                        if (status2==200) {
                            //$scope.images[i] = (data2.response.photos);
                            //console.log($scope.images);
                            //d((data2.response.photos.items))

                            //$scope.venues.i.test= "haha"//data2.response.photos.items;
                        }
                    })

                }
            d($scope.venues);

            } else {
                console.log(data);
            }
        });

        $scope.rad = function(x) {
            return x * Math.PI / 180;
        };

    }

}


function cardCtrl($rootScope, $scope, $http,API,$location,$stateParams,NgMap){

    d($scope);
}