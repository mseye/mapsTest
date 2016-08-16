angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, ConnectivityMonitor, CommandService) {

    var defaults = {
        defaultZoom: 17,
        maxZoom: 21
    };

    // subscribe to the camera button in the header
    CommandService.subscribe('camera', function() {
        $scope.map.setZoom(defaults.maxZoom);
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
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
                console.click('map clicked');
                infoWindow.open($scope.map, marker);
            });

        });




    }, function(error) {
        console.log("Could not get location");
    });
});