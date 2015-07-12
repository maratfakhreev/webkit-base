export default class RoutesHelper {
  static rootPath() { return ''; }
  static route() { return 'posts'; }

  static refresh() {
    Backbone.history.loadUrl();
  }
}
