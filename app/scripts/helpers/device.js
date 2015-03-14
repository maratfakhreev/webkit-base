import Vent from 'scripts/services/event_aggregator'

export default class DeviceHelper {
  static isMobileDevice() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
  }

  static hideKeyboard() {
    document.activeElement.blur();
  }

  static getVersion() {
    return cordova.getAppVersion(function(version) {
      Vent.trigger('app:version:get', version);
    });
  }
}
