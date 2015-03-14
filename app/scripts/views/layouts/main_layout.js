import FastClick from 'fastclick';
import Spinner from 'scripts/services/spinner';
import Vent from 'scripts/services/event_aggregator';
import AnimatedRegion from 'scripts/regions/animated';
import template from 'templates/layouts/main_layout';

export default class MainLayout extends Marionette.LayoutView {
  constructor(options) {
    this.el = 'body';
    this.template = template;

    this.regions = {
      navigationRegion: '#navigation_region',
      sideNavigationRegion: '#side_navigation_region',
      contentRegion: {
        selector: '#content_region',
        regionClass: AnimatedRegion,
        animation: {
          showAnimation: [
            {
              p: 'transition.slideLeftBigIn',
              o: {stagger: 300}
            }
          ]
        }
      }
    };

    this.events = {
      'swipeleft': 'onHideMenu'
    }

    super(options);

    this.listenTo(Vent, 'navigation:toggle', this.onToggleMenu);
  }

  onRender() {
    FastClick(this.$el[0]);
    Spinner.init();
    this.$el.hammer();
  }

  onHideMenu() {
    this.$el.removeClass('blurred');
  }

  onToggleMenu() {
    this.$el.toggleClass('blurred');
  }
}
