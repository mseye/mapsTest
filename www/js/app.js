// Ionic Starter App
//
// Maps setup with help from: http://www.joshmorony.com/integrating-google-maps-with-an-ionic-application/
// Next steps: http://www.joshmorony.com/part-3-advanced-google-maps-integration-with-ionic-and-remote-data/

angular.module('starter', ['ionic', 'ngCordova'])

// Configure ionic framework
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});