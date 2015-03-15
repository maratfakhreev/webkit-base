import AppConfig from 'scripts/config';
import Connection from 'scripts/services/connection_state';

const MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z';

export default class Geolocation {
  constructor($tagId, centerPoint = null) {
    if (window.google && google.maps) {
      this.$tagId = $tagId;
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

    this.map = new google.maps.Map(this.$tagId[0], mapOptions);
  }

  setUserPosition() {
    this.userPos = {};
    navigator.geolocation.getCurrentPosition((position) => {
      this.userPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, () => {
      console.log('Geolocation hasn\'t work on emulator');
      this.userPos = new google.maps.LatLng(40.766039, -73.97705829); //test coords
    });
  }

  renderMarkers(lat, long) {
    var markers = [];
    var carPos = new google.maps.LatLng(lat, long);
    markers.push(this.userPos);
    markers.push(this.carPos);

    for (let marker of markers) {
      marker.setMap(this.map);
    }
  }
}
