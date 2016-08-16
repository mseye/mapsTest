angular.module('starter')
    .service('MapService', ['CommandService',
        function(CommandService) {

            return {
                // options: 
                // { position, content, onclick }
                NewMarker: newMarker
            }

            // convert from various formats into google latLng format
            function googleLatLng(position) {
                console.log('position specified:', position);
                var latLng = null;
                if (!position) {
                    return null;
                } else if (position.lat) {
                    console.log('google type format, no need to convert');
                    latLng = position;
                } else if (position.coords) {
                    console.log('device type format');
                    latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                }
                return latLng;
            }

            function newMarker(map, opts) {
                if (!opts) opts = {};

                // determine where to place the marker
                var latLng = googleLatLng(opts.position);
                if (!opts.position) {
                    console.log('none specified. use center of map');
                    latLng = map.getCenter();
                }

                // create the marker and... 
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
                console.log('creating marker', marker);

                // ...info if necessary
                var infoWindow;
                if (opts.content) {
                    infoWindow = new google.maps.InfoWindow({
                        content: opts.content
                    });
                }

                // add a listner
                google.maps.event.addListener(marker, 'click', function() {
                    console.log('marker clicked');
                    if (infoWindow) infoWindow.open(map, marker);
                    if (opts.onclick) opts.onclick(marker)
                });

                // return the marker
                return marker;

            }

        }
    ]);