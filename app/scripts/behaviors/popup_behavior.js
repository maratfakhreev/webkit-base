import Vent from 'scripts/services/event_aggregator';

export default class PopupBehavior extends Marionette.Behavior {
  initialize() {
    this.ui = {
      closePopup: '.popup-close'
    };

    this.events = {
      'tap @ui.closePopup': 'onClosePopup'
    };
  }

  onClosePopup() {
    Vent.trigger('popup:destroy');
  }
}
