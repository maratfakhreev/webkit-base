import DeviceHelper from 'scripts/helpers/device';
import Spinner from 'scripts/services/spinner';

const DELAY = 300;

var confirm = _.debounce(function(...params) {
  if (DeviceHelper.isMobileDevice()) {
    navigator.notification.confirm(...params);
  }
  else {
    alert(params[0]);
    params[1]();
  }
}, DELAY);

var appAlert = _.debounce(function(...params) {
  if (DeviceHelper.isMobileDevice()) {
    navigator.notification.alert(...params);
  }
  else {
    alert(params[0]);
  }

  Spinner.spinHide();
}, DELAY);

export default class Notifications {
  static alert(message, callback) {
    return appAlert(message, callback, 'GGR Fleet Manager', 'OK');
  }

  static error(message, callback) {
    return appAlert(message, callback, 'Oops', 'OK');
  }

  static confirm(message, callback) {
    return confirm(message, callback, 'GGR Fleet Manager', 'Yes, No');
  }
}
