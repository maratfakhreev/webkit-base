import Vent from 'scripts/services/event_aggregator';

export default class BackgroundFetchBehavior extends Marionette.Behavior {
  initialize() {
    this.listenTo(Vent, 'navigation:change', this.onRefreshData);
  }

  onRender() {
    if (this.view.model) {
      this.view.stickit();
    }
  }

  onDestroy() {
    if (this.view.model) {
      this.view.unstickit();
    }
  }

  onRefreshData() {
    if (this.view.model) {
      this.view.model.fetch();
    }

    if (this.view.collection) {
      this.view.collection.fetch();
    }
  }
}
