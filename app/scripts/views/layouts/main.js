import FastClick from 'fastclick';
import Spinner from 'scripts/services/spinner';
import Vent from 'scripts/services/event_aggregator';
import AnimatedRegion from 'scripts/regions/animated';
import template from 'templates/layouts/main';

export default class MainLayout extends Marionette.LayoutView {
  constructor(options) {
    this.el = 'body';
    this.template = template;

    this.regions = {
      topBarRegion: '#top_bar_region',
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
      'swipeleft': 'onHideMenu',
      'swiperight': 'onShowMenu'
    };

    super(options);

    this.listenTo(Vent, 'navigation:toggle', this.onToggleMenu);
  }

  onRender() {
    FastClick(this.$el[0]);
    Spinner.init();
    this.$el.hammer();
  }

  onHideMenu() {
    this.$el.removeClass('navigation-show');
  }

  onShowMenu() {
    this.$el.addClass('navigation-show');
  }

  onToggleMenu() {
    this.$el.toggleClass('navigation-show');
  }
}
