var QUALITY = 70;

class Camera {
  static onChooseSuccess(imageData) {
    Camera.trigger('photo:added', imageData);
  }

  static onChooseDeny() {
    return null;
  }

  static capturePhoto() {
    navigator.camera.getPicture(
      this.onChooseSuccess,
      this.onChooseDeny,
      {
        quality: QUALITY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        encodingType: navigator.camera.EncodingType.JPEG,
        correctOrientation: true
      }
    );
  }

  static getPhoto() {
    navigator.camera.getPicture(
      this.onChooseSuccess,
      this.onChooseDeny,
      {
        quality: QUALITY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      }
    );
  }

  static exist() {
    if (navigator.camera) return true;
  }
}

_.extend(Camera, Backbone.Events);

export default Camera;
