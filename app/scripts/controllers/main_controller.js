import App from 'scripts/application';
import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import Spinner from 'scripts/services/spinner';
import MainLayout from 'scripts/views/layouts/main_layout';

function renderScreen() {
  // this.layout.navigationRegion.show(new HeaderLayout);
  // this.layout.sideNavigationRegion.show(new NavigationLayout);
}

export default class MainController extends Marionette.Controller {
  constructor(options) {
    super(options);

    this.layout = new MainLayout();
    this.layout.render();
  }

  root() {
    if (Session.isLoggedIn()) {
      if (!App.alreadyInitialized) {
        Spinner.spinShow();
        App.alreadyInitialized = true;
        renderScreen.call(this);
        Spinner.spinHide();
      }
      else {
        renderScreen.call(this);
      }
    }
    else {
      this.layout.navigationRegion.empty();
      this.layout.sideNavigationRegion.empty();
      // this.layout.contentRegion.show(new LoginView());
    }
  }
}
