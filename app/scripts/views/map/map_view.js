import Geolocation from 'scripts/services/geolocation';
import Notifications from 'scripts/services/notifications';
import Spinner from 'scripts/services/spinner';
import Vent from 'scripts/services/event_aggregator';
import AnimatedRegion from 'scripts/regions/animated';
import Post from 'scripts/models/post';
import AbstractFormView from 'scripts/views/abstract/form_view';
import Messages from 'scripts/helpers/messages';
import Dates from 'scripts/helpers/dates';
import template from 'templates/map/map';

export default class MapView extends AbstractFormView {
  constructor(options) {
    this.template = template;
    this.model = new Post();

    this.ui = {
      map: '#map',
      getUserPos: '.get-user-position',
      facebookIcon: '.facebook-icon',
      twitterIcon: '.twitter-icon'
    };

    this.events = {
      'tap @ui.getUserPos': 'onCheckIn',
      'tap @ui.twitterIcon': 'onActivateTwitter',
      'tap @ui.facebookIcon': 'onActivateFacebook'
    };

    this.bindings = {
      'textarea': {
        observe: 'message'
      }
    };

    this.templateHelpers = {
      activeProvider: function(provider) {
        return OAuth.create(provider);
      }
    };

    super(options);

    this.listenTo(AnimatedRegion, 'region:showed', this.onLoadGoogleMap);
  }

  onDestroy() {
    clearInterval(this.interval);

    super.onDestroy();
  }

  onLoadGoogleMap(region) {
    if (Geolocation.exist()) {
      Geolocation.getUserPoint().then((userPoint) => {
        this.geocoder = new Geolocation({type: 'geocoder'});
        this.map = new Geolocation({type: 'map', map: this.ui.map, centerPoint: userPoint});
        this.map.renderMarkers({
          withCurrentLocation: true,
          coordinates: []
        });
        this.geocoder.getStreetAddress(userPoint).then((address) => {
          this.model.set({
            'coordinates': {
              lat: userPoint.lat(),
              long: userPoint.lng()
            },
            'message': `Look for me here: ${address[0].formatted_address}`
          })
        });
      });
    }
  }

  onCheckIn() {
    Geolocation.getUserPoint().then((userPoint) => {
      if (OAuth.create('twitter') || OAuth.create('facebook')) {
        Spinner.show();
        this.geocoder.getStreetAddress(userPoint).then((address) => {
          this.model.set({
            'coordinates': {
              lat: userPoint.lat(),
              long: userPoint.lng()
            },
            'date': Dates.now(),
            'message': `Look for me here: ${address[0].formatted_address}`
          }).save(null, {
            success: () => {
              Vent.trigger('post:add', this.model);
              Notifications.alert(Messages.postCreateSuccessMsg);

              if (OAuth.create('twitter') && this.ui.twitterIcon.hasClass('selected')) {
                this.model.postToTwitter();
              }

              if (OAuth.create('facebook') && this.ui.facebookIcon.hasClass('selected')) {
                this.model.postToFacebook();
              }
            },
            complete: function() {
              Spinner.hide();
            }
          });
        });
      }
      else {
        Notifications.error(Messages.allAuthErrorMsg);
      }
    });
  }

  onActivateTwitter() {
    this._activateProvider('twitter', this.ui.twitterIcon);
  }

  onActivateFacebook() {
    this._activateProvider('facebook', this.ui.facebookIcon);
  }

  _activateProvider(provider, providerIcon) {
    if (OAuth.create(provider)) {
      providerIcon.removeClass('selected');
    }
    else {
      OAuth.popup(provider, {cache: true}).done(function() {
        providerIcon.addClass('selected');
      }).fail(function(err) {
        Notifications.error(Messages.authErrorMsg);
      });
    }
  }
}
