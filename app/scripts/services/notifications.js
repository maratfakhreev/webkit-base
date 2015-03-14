import DeviceHelper from 'scripts/helpers/device';
import Spinner from 'scripts/services/spinner';

export default class Notifications {
  static alert(message, callback) {
    this.appAlert(message, callback, 'GGR Fleet Manager', 'OK')
  }

  static error(message, callback) {
    this.appAlert(message, callback, 'Oops', 'OK')
  }

  static confirm(message, callback) {
    navigator.notification.confirm(message, callback, 'GGR Fleet Manager', 'Yes, No')
  }

  static appAlert(...params) {
    if (DeviceHelper.isMobileDevice()) {
      navigator.notification.alert(...params);
    }
    else {
      alert(params[0]);
    }

    Spinner.spinHide();
  }

  static confirm(...params) {
    if (DeviceHelper.isMobileDevice()) {
      navigator.notification.confirm(...params);
    }
    else {
      alert(params[0]);
      params[1]();
    }
  }
}
