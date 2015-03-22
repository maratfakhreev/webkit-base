import Connection from 'scripts/services/connection_state';
import Notifications from 'scripts/services/notifications';
import DeviceHelper from 'scripts/helpers/device';

var App = new Marionette.Application();

App.alreadyInitialized = false;

App.navigate = function(route, options) {
  options = options || {};
  return Backbone.history.navigate(route, options);
};

App.on('start', function() {
  if (Connection()) {
    Backbone.history.start();
    $.event.special.swipe.horizontalDistanceThreshold = 130;
    $.event.special.swipe.verticalDistanceThreshold = 130;

    $(document).on('click', '.js-link', function(event) {
      event.preventDefault();
      var href = $(event.currentTarget).attr('href');
      App.navigate(href, {trigger: true});
    });
  }
  else {
    Notifications.alert('No internet connection. Please try again or later.');
  }
});

App.init = function() {
  if (DeviceHelper.isMobileDevice()) {
    document.addEventListener('deviceready', (function() {
      App.start();
    }), false);
  }
  else {
    $(document).ready(function() {
      App.start();
    });
  }
};

export default App
