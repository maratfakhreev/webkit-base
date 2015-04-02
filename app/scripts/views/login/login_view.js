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
      'tap @ui.submitButton': 'onFormSubmit'
    };

    this.bindings = {
      'input[name="name"]': {
        observe: 'user.name',
        updateView: false
      },
      'input[type="password"]': {
        observe: 'user.password',
        updateView: false
      }
    };

    super(options);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.model.isValid(true)) {
      Spinner.spinShow();
      Session.create().then(function() {
        Spinner.spinHide();
      });
    }
  }
}
