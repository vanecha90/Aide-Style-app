angular.module('starter')

.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'dav-images';

  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  };

  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  };

  return {
    storeImage: addImage,
    images: getImages
  }
})

.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {

  function optionsForType(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
	  quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: source,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
	  correctOrientation:true
    };
  }

  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var options = optionsForType(type);

      $cordovaCamera.getPicture(options).then(function(imageBase64) {
			FileService.storeImage(imageBase64);
	  });
    })
  }
  return {
    handleMediaDialog: saveMedia
  }
});
