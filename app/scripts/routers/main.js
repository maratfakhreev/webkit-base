import App from 'scripts/application';
import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import RoutesHelper from 'scripts/helpers/routes';

export default class MainRouter extends Marionette.AppRouter {
  constructor(options) {
    this.appRoutes = {
      '': 'root',
      'posts': 'posts'
    };

    this.before = {
      '(*path)': 'onBeforeRoute'
    };

    super(options);

    this.listenTo(Vent, 'app:resume', this.onResumeApp);
    this.listenTo(Session, 'session:create session:destroy', this.onRedirectToRoot);
    this.listenTo(Backbone.history, 'route', this.onNavigationChange);
  }

  onBeforeRoute() {
    Vent.trigger('popup:destroy');
  }

  onRedirectToRoot() {
    if (Backbone.history.fragment === RoutesHelper.rootPath()) {
      Backbone.history.loadUrl(Backbone.history.fragment);
    }
    else {
      this.navigate(RoutesHelper.rootPath(), {trigger: true});
    }
  }

  onNavigationChange() {
    Vent.trigger('navigation:change', Backbone.history.fragment);
  }

  onResumeApp() {
    App.alreadyInitialized = false;
    this.navigate(RoutesHelper.rootPath(), {trigger: true});
  }
}
