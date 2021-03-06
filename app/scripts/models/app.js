import AppConfig from 'scripts/config';
import Connection from 'scripts/services/connection_state';
import Spinner from 'scripts/services/spinner';
import Session from 'scripts/services/session';
import Notifications from 'scripts/services/notifications';
import Messages from 'scripts/helpers/messages';

const ERRORS = [401, 403, 404, 422];

export default class AppModel extends Backbone.NestedModel {
  constructor(options) {
    this.urlRoot = `${AppConfig.apiPath}/${_.result(this, 'urlRoot')}`;

    super(options);

    this.listenTo(this, 'error', this.onErrorHandler);

    if (this.validation) {
      this.listenTo(this, 'validated:invalid', this.onInvalidValidation);
    }
  }

  sync(method, model, options) {
    if (Connection()) {
      if (Session.isLoggedIn()) {
        options.headers = options.headers || {};
        _.extend(options.headers, { 'Authorization': `Token token=${Session.token}` });
      }
    }
    else {
      Notifications.error(Messages.connectionErrorMsg);
    }

    return super.sync(method, model, options);
  }

  fetch(options) {
    let deferred = new $.Deferred();
    Spinner.show();
    super.fetch(options).done(function() {
      Spinner.hide();
      deferred.resolve();
    }).fail(function() {
      Spinner.hide();
      deferred.reject();
    });

    return deferred.promise();
  }

  onErrorHandler(model, error) {
    if (ERRORS.some(function(element) { return element === error.status; })) {
      Notifications.error(_.values(error.responseJSON)[0]);
    }
    else {
      Notifications.error('Server error');
    }
  }

  onInvalidValidation(model, errors) {
    let message = _.chain(errors).values().join('\n').value();
    Notifications.error(message);
  }
}
