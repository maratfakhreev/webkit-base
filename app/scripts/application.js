import Connection from 'scripts/services/connection_state';
import Notifications from 'scripts/services/notifications';

var App = new Marionette.Application();

App.alreadyInitialized = false;

App.navigate = function(route, options) {
  options || (options = {});
  return Backbone.history.navigate(route, options);
};

App.on('start', function() {
  if (Connection()) {
    Backbone.history.start();

    $(document).on('click, tap', '.js-link', function(event) {
      event.preventDefault();
      var href = $(event.currentTarget).attr('href');
      App.navigate(href, {trigger: true});
    });
  }
  else {
    Notifications.alert('No internet connection. Please try again or later.');
  }
});

export default App;
