function testPoint() {
  return new google.maps.LatLng(40.766039, -73.97705829);
}

class GeoMap {
  constructor(options) {
    this.container = options.map[0];

    var mapOptions = {
      zoom: 15,
      center: options.centerPoint || testPoint(),
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
        this._renderMarkersArray(this.currentMap, testPoint());
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
    _.each(this.markersCoordinates, (value, key) => {
      var icon = {};

      if (this.markersImages && this.markersImages[key]) {
        icon = this.markersImages[key];
      }
      else {
        icon = {
          path: 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
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
}

class GeoAutocomplete {
  constructor() {
    this.service = new google.maps.places.AutocompleteService();
  }

  getPlacePredictions(obj) {
    return this._getPredictions('getPlacePredictions', obj);
  }

  getQueryPredictions(obj) {
    return this._getPredictions('getQueryPredictions', obj);
  }

  _getPredictions(method, obj) {
    var deferred = $.Deferred();

    this.service[method](obj, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        deferred.reject();
      }
      else {
        var predictionsCollection = [];
        for (let prediction of predictions) {
          predictionsCollection.push(prediction);
        }
        deferred.resolve(predictionsCollection);
      }
    });

    return deferred.promise();
  }
}

class GeoGeocoder {
  constructor() {
    this.service = new google.maps.Geocoder();
  }

  getStreetAddress(latLng) {
    var deferred = $.Deferred();
    this.service.geocode({latLng}, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        deferred.resolve(response);
      }
    });

    return deferred.promise();
  }
}

export default class GeolocationFactory {
  constructor(options) {
    this.geoClass = GeoMap;

    switch (options.type) {
      case 'map':
        this.geoClass = GeoMap;
        break;
      case 'autocomplete':
        this.geoClass = GeoAutocomplete;
        break;
      case 'geocoder':
        this.geoClass = GeoGeocoder;
        break;
    }

    return new this.geoClass(options);
  }

  static exist() {
    if (window.google && google.maps) return true;
  }

  static createPoint(latitude, longitude) {
    return new google.maps.LatLng(latitude, longitude);
  }

  static getUserPoint() {
    var deferred = $.Deferred();
    navigator.geolocation.getCurrentPosition((position) => {
      deferred.resolve(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }, () => {
      deferred.resolve(testPoint());
    });

    return deferred.promise();
  }
}
