import AppConfig from 'scripts/config';
import Connection from 'scripts/services/connection_state';
import Session from 'scripts/services/session';
import Notifications from 'scripts/services/notifications';
import Messages from 'scripts/helpers/messages';

export default class AppCollection extends Backbone.Collection {
  constructor(options) {
    this.url = `${AppConfig.apiPath}/${_.result(this, 'url')}`;
    super(options);
  }

  sync(method, model, options) {
    if (Connection()) {
      if (Session.isLoggedIn()) {
        options.headers = options.headers || {};
        _.extend(options.headers, {'Authorization': `Token token=${Session.token}`});
      }
    }
    else {
      Notifications.error(Messages.connectionErrorMsg);
    }

    return super.sync(method, model, options);
  }
}
