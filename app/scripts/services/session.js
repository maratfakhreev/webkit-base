import App from 'scripts/application';
import AppConfig from 'scripts/config';
import User from 'scripts/models/user';
import Storage from 'scripts/services/storage';

const SESSION_KEY = AppConfig.sessionKey;
const STORAGE_KEY = AppConfig.storageKey;
let currentUser = null;

class Session {
  static currentUser() {
    return currentUser || (currentUser = new User(Storage.get(STORAGE_KEY)));
  }

  static create() {
    let deferred = $.Deferred();

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
    this.currentUser().clear();
    this.trigger('session:destroy');
    App.alreadyInitialized = false;
  }

  static save() {
    Storage.set(STORAGE_KEY, this.currentUser().toJSON());
  }

  static isLoggedIn() {
    return this.currentUser().has(SESSION_KEY);
  }

  static get token() {
    return this.currentUser().get(SESSION_KEY);
  }
}

_.extend(Session, Backbone.Events);

export default Session;
