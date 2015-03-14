import AppConfig from 'scripts/config';
import User from 'scripts/models/user';
import Storage from 'scripts/services/storage';
import Vent from 'scripts/services/event_aggregator';

var Session = (function() {
  var SESSION_KEY = AppConfig.sessionKey;
  var currentUser = null;

  function Session() {};
  _.extend(Session, Backbone.Events);

  Session.currentUser = function() {
    return currentUser || (currentUser = new User({token: Storage.get(SESSION_KEY)}));
  };

  Session.create = function() {
    var deferred = $.Deferred();

    if (!this.isLoggedIn()) {
      this.currentUser().save(null, {
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        success: () => {
          this.save();
          this.trigger('session:create');
          deferred.resolve();
        },
        error: function() {
          deferred.reject();
        }
      });
    };

    return deferred.promise();
  };

  Session.destroy = function() {
    Storage.remove(SESSION_KEY);
    this.currentUser().clear();
    this.trigger('session:destroy');
  };

  Session.save = function() {
    Storage.set(SESSION_KEY, this.currentUser().get(SESSION_KEY));
  };

  Session.isLoggedIn = function() {
    return this.currentUser().has(SESSION_KEY);
  };

  Session.getToken = function() {
    return this.currentUser().get(SESSION_KEY);
  };

  Session.getUserId = function() {
    return this.currentUser().get(user_id);
  };

  return Session;
})();

export default Session;
