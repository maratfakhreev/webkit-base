export default class RoutesHelper {
  static rootPath() { return ''; }
  static route() { return 'route'; }

  static refresh() {
    Backbone.history.loadUrl();
  }
}
