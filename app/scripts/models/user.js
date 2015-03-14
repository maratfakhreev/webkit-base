import AppConfig from 'scripts/config';
import Notifications from 'scripts/services/notifications';

export default class User extends Backbone.NestedModel {
  constructor(options) {
    this.urlRoot = `${AppConfig.apiPath}/sessions/sign_in`;
    this.validation = {
      'user.email': {
        required: true
      },
      'user.password': {
        required: true
      }
    };

    super(options);

    this.listenTo(this, 'error', this.onErrorHandler);
  }

  onErrorHandler(model, error) {
    if (error.status === 401 || error.status === 403)
      if (error.responseJSON) Notifications.alert(error.responseJSON.error);
  }
}
