var instance = null;

class EventAggregator {
  static instance() {
    return instance || (instance = new Backbone.Wreqr.EventAggregator());
  }
}

export default EventAggregator.instance();
