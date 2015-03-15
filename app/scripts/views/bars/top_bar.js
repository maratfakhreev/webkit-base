import Vent from 'scripts/services/event_aggregator';
import RoutesHelper from 'scripts/helpers/routes';
import template from 'templates/bars/top_bar';

export default class TopNavigationView extends Marionette.ItemView {
  constructor(options) {
    this.className = 'top-bar-inner';
    this.template = template;

    this.ui = {
      menuButton: '.menu-button',
      refreshButton: '.refresh-button'
    };

    this.events = {
      'click @ui.refreshButton': 'onClickRefreshButton',
      'click @ui.menuButton': 'onClickMenuButton'
    };

    super(options);

    this.title = this.options.title;
  }

  serializeData() {
    return {
      title: this.title
    };
  }

  onClickRefreshButton() {
    RoutesHelper.refresh();
  }

  onClickMenuButton() {
    Vent.trigger('navigation:toggle');
  }
}
