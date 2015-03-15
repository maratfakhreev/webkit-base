import Vent from 'scripts/services/event_aggregator';

export default class Camera {
  constructor() {
    this.camera = navigator.camera;
  }

  onChooseSuccess(imageData) {
    Vent.trigger('photo:added', imageData);
  }

  onChooseDeny() {
    return null;
  }

  capturePhoto() {
    this.camera.getPicture(
      this.onChooseSuccess,
      this.onChooseDeny,
      {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      }
    );
  }

  getPhoto() {
    this.camera.getPicture(
      this.onChooseSuccess,
      this.onChooseDeny,
      {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    );
  }
}
