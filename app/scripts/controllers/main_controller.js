import AppConfig from 'scripts/config';
import App from 'scripts/application';
import Vent from 'scripts/services/event_aggregator';
import Session from 'scripts/services/session';
import Spinner from 'scripts/services/spinner';
import Posts from 'scripts/collections/posts';
import MainLayout from 'scripts/views/layouts/main';
import SideNavigationLayout from 'scripts/views/layouts/side_navigation';
import TopBarView from 'scripts/views/bars/top_bar';
import LoginView from 'scripts/views/login/login_view';
import MapView from 'scripts/views/map/map_view';
import PostsListView from 'scripts/views/posts/posts_list_view';

function renderScreen() {
  this.layout.topBarRegion.show(new TopBarView({ title: 'Check-in' }));
  this.layout.sideNavigationRegion.show(new SideNavigationLayout());
  this.layout.contentRegion.show(new MapView());
}

export default class MainController extends Marionette.Controller {
  constructor(options) {
    super(options);

    this.layout = new MainLayout();
    this.layout.render();
    this.listenTo(Vent, 'post:add', this.onAddItem);
    this.listenTo(Session, 'session:destroy', this.onClearOAuthCache);
  }

  root() {
    if (Session.isLoggedIn()) {
      if (!App.alreadyInitialized) {
        Spinner.spinShow();
        OAuth.initialize(AppConfig.oAuth);
        App.alreadyInitialized = true;
        this.posts = new Posts();
        this.posts.fetch().then(() => {
          renderScreen.call(this);
          Spinner.spinHide();
        });
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

  posts() {
    this.layout.topBarRegion.show(new TopBarView({ title: 'Check-ins' }));
    this.layout.contentRegion.show(new PostsListView({ collection: this.posts }));
  }

  onAddItem(model) {
    this.posts.add(model);
  }

  onClearOAuthCache() {
    OAuth.clearCache();
  }
}
