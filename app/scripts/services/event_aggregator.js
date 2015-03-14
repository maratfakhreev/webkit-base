var EventAggregator = (function() {
  var instance = null;

  function EventAggregator() {
    if (instance === null) {
      instance = new Backbone.Wreqr.EventAggregator();
    }
    return instance;
  }

  return EventAggregator;

})();

var vent = new EventAggregator();

export default vent;
