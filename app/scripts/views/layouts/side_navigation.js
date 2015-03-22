import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import RoutesHelper from 'scripts/helpers/routes';
import BackgroundFetchBehavior from 'scripts/behaviors/background_fetch_behavior';
import template from 'templates/layouts/side_navigation';

export default class SideNavigationLayout extends Marionette.LayoutView {
  constructor(options) {
    this.className = 'side-navigation';
    this.template = template;
    this.model = Session.currentUser();

    this.templateHelpers = {
      routes: RoutesHelper
    };

    this.ui = {
      logoutButton: '.logout'
    };

    this.events = {
      'tap @ui.logoutButton': 'onLogout'
    };

    this.behaviors = {
      BackgroundFetchBehavior: {
        behaviorClass: BackgroundFetchBehavior
      }
    };

    super(options);

    this.listenTo(Vent, 'navigation:change', this.onChangePage);
  }

  onLogout() {
    Vent.trigger('navigation:hide');
    setTimeout(() => {Session.destroy();}, 200);
  }

  onChangePage() {
    Vent.trigger('navigation:hide');
  }
}
