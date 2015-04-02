var MAP_PIN = 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z';

export default class Geolocation {
  constructor(container, centerPoint = null) {
    this.container = container[0];
    this.centerPoint = centerPoint;
    this.testPoint = new google.maps.LatLng(40.766039, -73.97705829);
    this.mapInit();
  }

  mapInit() {
    var mapOptions = {
      zoom: 15,
      center: this.centerPoint || this.testPoint,
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

    this.currentMap = new google.maps.Map(this.container, mapOptions);
    google.maps.event.trigger(this.currentMap, "resize");
  }

  fitMap() {
    if (this.markersCoordinates) {
      var bounds = new google.maps.LatLngBounds();

      _.each(this.markersCoordinates, function(value, key) {
        bounds.extend(value);
      });

      this.currentMap.fitBounds(bounds);
    }

    return this;
  }

  setCenter(centerCoordinates) {
    this.currentMap.setCenter(centerCoordinates);

    return this;
  }

  renderMarkers(options) {
    this.markersCoordinates = options.coordinates;
    this.markersImages = options.markersImages;
    this.withCurrentLocation = options.withCurrentLocation;

    if (this.withCurrentLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var userCoordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this._renderMarkersArray(this.currentMap, userCoordinates);
      }, () => {
        this._renderMarkersArray(this.currentMap, this.testPoint);
      });
    }
    else {
      this._renderMarkersArray(this.currentMap);
    }

    return this;
  }

  deleteMarkers() {
    this._renderMarkersArray(null);
    this.markers = [];

    return this;
  }

  changeMarkersPositions(markersCoordinates) {
    this.markersCoordinates = markersCoordinates;

    if (this.userCoordinates) {
      this.markersCoordinates.unshift(this.userCoordinates);
    }

    _.each(this.markers, (value, key) => {
      value.setPosition(this.markersCoordinates[key]);
    });

    return this;
  }

  _renderMarkersArray(map, userCoordinates = null) {
    if (userCoordinates) {
      this.userCoordinates = userCoordinates;
      this.markersCoordinates.unshift(userCoordinates);
    }

    this.markers = [];
    var icon = {};
    _.each(this.markersCoordinates, (value, key) => {
      if (this.markersImages && this.markersImages[key]) {
        icon = this.markersImages[key];
      }
      else {
        icon = {
          path: MAP_PIN,
          fillOpacity: 0.7,
          fillColor: '#333',
          strokeColor: '#235253',
          strokeWeight: 1.1,
          scale: 1/4
        };
      }

      var googleMarker = new google.maps.Marker({
        position: value,
        map: map,
        icon: icon
      });
      googleMarker.setMap(map);
      this.markers.push(googleMarker);
    });
  }

  static exist() {
    if (window.google && google.maps) return true;
  }

  static createPoint(latitude, longitude) {
    return new google.maps.LatLng(latitude, longitude);
  }
}
