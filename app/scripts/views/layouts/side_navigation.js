import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import RoutesHelper from 'scripts/helpers/routes';
import template from 'templates/layouts/side_navigation';

export default class SideNavigationLayout extends Marionette.LayoutView {
  constructor(options) {
    this.className = 'side-navigation';
    this.template = template;
    this.model = Session.currentUser();

    this.templateHelpers = {
      routes: RoutesHelper
    };

    this.events = {
      'click .logout': 'onLogout'
    };

    super(options);

    this.listenTo(Vent, 'navigation:toggle', this.onToggleMenu);
  }

  onRender() {
    this.$el.hammer();
  }

  onLogout() {
    Vent.trigger('navigation:toggle');
    _.delay(Session.destroy, 300);
  }
}
