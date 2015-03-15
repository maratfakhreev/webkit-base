import AbstractFormView from 'scripts/views/abstract/form_view';
import Session from 'scripts/services/session';
import Spinner from 'scripts/services/spinner';
import Vent from 'scripts/services/event_aggregator';
import Notifications from 'scripts/services/notifications';
import MessagesHelper from 'scripts/helpers/messages';
import RoutesHelper from 'scripts/helpers/routes';
import template from 'templates/login/login';

export default class LoginView extends AbstractFormView {
  constructor(options) {
    this.className = 'screen login-screen';
    this.model = Session.currentUser();
    this.template = template;

    this.templateHelpers = {
      routes: RoutesHelper
    };

    this.ui = {
      submitButton: '.submit-button'
    };

    this.events = {
      'click @ui.submitButton': 'onFormSubmit'
    };

    this.bindings = {
      'input[name="name"]': {
        observe: 'user.name',
        updateView: false,
        setOptions: {
          validate: true
        }
      },
      'input[type="password"]': {
        observe: 'user.password',
        updateView: false,
        setOptions: {
          validate: true
        }
      }
    };

    super(options);
  }

  onRender() {
    this.$el.hammer();
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.model.isValid()) {
      Spinner.spinShow();
      Session.create().then(function() {
        Spinner.spinHide();
      })
    }
    else {
      Notifications.error(MessagesHelper.fillAllFieldsErrorMsg);
    }
  }
}
