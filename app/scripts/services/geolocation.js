const MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z';
var currentMap = null;

export default class Geolocation {
  constructor(container, centerPoint = null) {
    if (window.google && google.maps) {
      this.container = container;
      this.centerPoint = centerPoint;
      this.setUserPosition();
      this.mapInit();
    }
  }

  mapInit() {
    if (this.centerPoint === null) {
      this.centerPoint = new google.maps.LatLng(40.766029, -73.97705819);
    }

    var mapOptions = {
      zoom: 15,
      center: this.centerPoint,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        featureType: 'poi',
        stylers: [{
          visibility: 'off'
        }]
      }]
    };

    currentMap = new google.maps.Map(this.container[0], mapOptions);
  }

  get userPosition() {
    var userPos = {};
    navigator.geolocation.getCurrentPosition((position) => {
      userPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, () => {
      console.log('Geolocation hasn\'t work on emulator');
      userPos = new google.maps.LatLng(40.766039, -73.97705829);
    });

    return userPos;
  }

  renderMarkers(markersCoordinates) {
    for (let marker of markersCoordinates) {
      marker.setMap(currentMap);
    }
  }
}
