angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, ConnectivityMonitor, MapService, CommandService, CameraService) {

    var defaults = {
        defaultZoom: 17,
        maxZoom: 21,
    };

    // subscribe to the camera button in the header
    CommandService.subscribe('camera', function() {
        // zoom in
        $scope.map.setZoom(defaults.maxZoom);

        var center = $scope.map.getCenter();
        console.log('center: ', center);

        CameraService.OpenCamera();

    });


    // Get location, then setup map with pin
    var geoLocationOptions = {
        timeout: 10000,
        enableHighAccuracy: true
    };
    $cordovaGeolocation.getCurrentPosition(geoLocationOptions).then(function(position) {

            console.log('current position: ', position);

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: defaults.defaultZoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


            //Wait until the map is loaded (idle event fired), add marker
            google.maps.event.addListenerOnce($scope.map, 'idle', function() {

                MapService.NewMarker($scope.map, {
                    //position: position,
                    content: "here I am",
                    onclick: function(m) {
                        console.log('marker clicked', m);
                    }
                });

            });

            google.maps.event.addListener($scope.map, 'click', function(d) {
                console.log('map clicked: ', d);
                MapService.NewMarker($scope.map, {
                    position: d.latLng
                });
                $scope.map.setCenter(d.latLng);
            });

        },
        function(error) {
            console.log("Could not get location");
        });
});