export default class RoutesHelper {
  static get rootPath() {return '';}
  static get route() {return 'route';}

  static refresh() {
    Backbone.history.loadUrl();
  }
}
