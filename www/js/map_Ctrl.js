angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, ConnectivityMonitor, CommandService) {

    var defaults = {
            defaultZoom: 17,
            maxZoom: 21
        }
        // subscribe to the add button in the header
    CommandService.subscribe('add', function() {
        $scope.map.setZoom(defaults.maxZoom);
    });

    // online/offline indicator
    $scope.online = ConnectivityMonitor.isOnline;
    ConnectivityMonitor.startWatching(
        function(onlineStatus) {
            $scope.online = onlineStatus;
        }
    )

    // Get location, then setup map with pin
    var geoLocationOptions = {
        timeout: 10000,
        enableHighAccuracy: true
    };
    $cordovaGeolocation.getCurrentPosition(geoLocationOptions).then(function(position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: defaults.defaultZoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded, add marker
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {

            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            var infoWindow = new google.maps.InfoWindow({
                content: "Here I am baby!"
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open($scope.map, marker);
            });

        });

    }, function(error) {
        console.log("Could not get location");
    });



});