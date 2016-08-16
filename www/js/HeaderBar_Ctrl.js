angular.module('starter')
    .controller('HeaderBarCtrl', ['$scope', 'CommandService', function($s, CommandService) {

        $s.title = "AssetCALC GO";
        //$s.message = CommandService.helloWorld()
        $s.addButtonClick = function() {
            CommandService.addButtonClick();
        }

    }]);