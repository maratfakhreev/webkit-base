var channels = {};
var instance = null;

class CustomEventAggregator {
  static on(channel, callback) {
    if (!channels[channel]) {
      channels[channel] = [];
    }

    channels[channel].push({
      context: this,
      callback: callback
    });

    return this;
  }

  static trigger(channel) {
    if (!channels[channel]) return false;
    let args = Array.prototype.slice.call(arguments, 1);

    for (let i = 0, l = channels[channel].length; i < l; i++) {
      let subscription = channels[channel][i];
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  }
}

// usage example
// Mediator.on('attrChange', (attribute) => {
//   this.attribute = attribute;
//   console.log(`id_${this.attribute}`);
// });
//
// Mediator.trigger('attrChange', 'class');

class EventAggregatorFactory {
  static createAggregator() {
    this.eventAggregatorClass = {};

    if (Backbone && Backbone.Wreqr) {
      this.eventAggregatorClass = new Backbone.Wreqr.EventAggregator();
    }
    else {
      this.eventAggregatorClass = CustomEventAggregator;
    }

    return this.eventAggregatorClass;
  }

  static instance() {
    return instance || (instance = this.createAggregator());
  }
}

export default EventAggregatorFactory.instance();
