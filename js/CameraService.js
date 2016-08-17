angular.module('starter')
    .service('CameraService', ['$cordovaCamera',
        function($cordovaCamera) {

            return {
                OpenCamera: openCamera
            };

            function openCamera() {

                console.log($cordovaCamera);

                if ($cordovaCamera === {} || !Camera) {
                    alert('No camera available');
                    return;
                }

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
            }
        }
    ]);