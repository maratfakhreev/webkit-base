var ReqRes = (function() {
  var instance = null;

  function ReqRes() {
    if (instance === null) {
      instance = new Backbone.Wreqr.RequestResponse();
    }
    return instance;
  }

  return EventAggregator;

})();

var reqres = new ReqRes();

export default reqres;
