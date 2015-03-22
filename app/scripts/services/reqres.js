var instance = null;

class ReqRes {
  static instance() {
    return instance || (instance = new Backbone.Wreqr.RequestResponse());
  }
}

export default ReqRes.instance();
