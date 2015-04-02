import AppConfig from 'scripts/config';
import Notifications from 'scripts/services/notifications';

export default class User extends Backbone.NestedModel {
  constructor(options) {
    this.urlRoot = `${AppConfig.apiPath}/sessions/sign_in`;
    this.validation = {
      'user.name': {
        required: true
      },
      'user.password': {
        required: true,
        minLength: 6
      }
    };

    super(options);

    this.listenTo(this, 'error', this.onErrorHandler);
    this.listenTo(this, 'validated:invalid', this.onInvalidValidation);
  }

  onErrorHandler(model, error) {
    if (error.status === 401 || error.status === 403) {
      if (error.responseJSON) Notifications.alert(error.responseJSON.error);
    }
  }

  onInvalidValidation(model, errors) {
    var message = _.chain(errors).values().join('\n').value();
    Notifications.error(message);
  }
}
