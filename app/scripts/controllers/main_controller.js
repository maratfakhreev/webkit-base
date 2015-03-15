import App from 'scripts/application';
import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import Spinner from 'scripts/services/spinner';
import MainLayout from 'scripts/views/layouts/main';
import LandingLayout from 'scripts/views/layouts/landing';
import SideNavigationLayout from 'scripts/views/layouts/side_navigation';
import TopBarView from 'scripts/views/bars/top_bar';
import LoginView from 'scripts/views/login/login_view';

function renderScreen() {
  this.layout.topBarRegion.show(new TopBarView({title: 'Webkit Base'}));
  this.layout.sideNavigationRegion.show(new SideNavigationLayout());
  this.layout.contentRegion.show(new LandingLayout());
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
      this.layout.topBarRegion.empty();
      this.layout.sideNavigationRegion.empty();
      this.layout.contentRegion.show(new LoginView());
    }
  }

  route() {
    // define other route
  }
}
