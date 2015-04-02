import Connection from 'scripts/services/connection_state';
import Notifications from 'scripts/services/notifications';
import Device from 'scripts/services/device';
import Messages from 'scripts/helpers/messages';

var App = new Marionette.Application();

App.alreadyInitialized = false;

App.navigate = function(route, options) {
  options = options || {};
  return Backbone.history.navigate(route, options);
};

App.on('start', function() {
  if (Connection()) {
    Backbone.history.start();
    Device.setEvents();

    $(document).on('click', '.js-link', function(event) {
      event.preventDefault();
      var href = $(event.currentTarget).attr('href');
      App.navigate(href, {trigger: true});
    });
  }
  else {
    Notifications.alert(Messages.noInternetConnectionMsg);
  }
});

App.init = function() {
  if (Device.isMobileDevice()) {
    document.addEventListener('deviceready', function() { App.start(); }, false);
  }
  else {
    $(document).ready(function() { App.start(); });
  }
};

export default App;
