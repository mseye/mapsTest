angular.module('starter')
    .controller('HeaderBarCtrl', ['$scope', 'CommandService', 'ConnectivityMonitor',
        function($s, CommandService, ConnectivityMonitor) {

            $s.title = "AssetCALC GO";

            // Online-Offline Monitor
            $s.online = true; //ConnectivityMonitor.isOnline();

            ConnectivityMonitor.startWatching(
                function(onlineStatus) {
                    $scope.online = onlineStatus;
                }
            )

            // Events
            $s.cameraClick = function() {

                // tell whoever is listning the camera button was clicked
                CommandService.command('camera');
            }

        }
    ]);