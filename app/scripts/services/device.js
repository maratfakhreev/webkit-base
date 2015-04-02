import Vent from 'scripts/services/event_aggregator';

export default class Device {
  static setEvents() {
    if (Device.isMobileDevice()) {
      if (FastClick) FastClick.attach(document.body);
      $.event.special.swipe.horizontalDistanceThreshold = 100;
      $.event.special.swipe.verticalDistanceThreshold = 100;

      document.addEventListener('resume', function() {
        Vent.trigger('app:resume');
      }, false);

      document.addEventListener('pause', function() {
        Vent.trigger('app:pause');
      });
    }
  }

  static isMobileDevice() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
  }

  static hideKeyboard() {
    document.activeElement.blur();
  }

  static showActionsheet(options, callback) {
    if (window.plugins && window.plugins.actionsheet) {
      window.plugins.actionsheet.show(options, callback);
    }
  }

  static hideActionsheet() {
    if (window.plugins && window.plugins.actionsheet) {
      window.plugins.actionsheet.hide();
    }
  }

  static getVersion() {
    if (cordova.getAppVersion) {
      return cordova.getAppVersion(function(version) {
        Vent.trigger('app:version:get', version);
      });
    }
  }
}
