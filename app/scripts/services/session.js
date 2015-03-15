import AppConfig from 'scripts/config';
import User from 'scripts/models/user';
import Storage from 'scripts/services/storage';

const SESSION_KEY = AppConfig.sessionKey;
const STORAGE_KEY = AppConfig.storageKey;
var currentUser = null;

class Session {
  static currentUser() {
    return currentUser || (currentUser = new User(Storage.get(STORAGE_KEY)));
  }

  static create() {
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
    }

    return deferred.promise();
  }

  static destroy() {
    Storage.remove(STORAGE_KEY);
    Session.currentUser().clear();
    Session.trigger('session:destroy');
  }

  static save() {
    Storage.set(STORAGE_KEY, this.currentUser().toJSON());
  }

  static isLoggedIn() {
    return this.currentUser().has(SESSION_KEY);
  }

  static getToken() {
    return this.currentUser().get(SESSION_KEY);
  }
}

_.extend(Session, Backbone.Events);

export default Session;
