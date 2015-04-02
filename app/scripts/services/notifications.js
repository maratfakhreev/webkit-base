import Device from 'scripts/services/device';

const DELAY = 300;

var confirm = _.debounce(function(...params) {
  if (Device.isMobileDevice()) {
    navigator.notification.confirm(...params);
  }
  else {
    alert(params[0]);
    params[1]();
  }
}, DELAY);

var appAlert = _.debounce(function(...params) {
  if (Device.isMobileDevice()) {
    navigator.notification.alert(...params);
  }
  else {
    alert(params[0]);
  }
}, DELAY);

export default class Notifications {
  static alert(message, callback) {
    return appAlert(message, callback, 'GoGreenRide', 'OK');
  }

  static error(message, callback) {
    return appAlert(message, callback, 'Oops', 'OK');
  }

  static confirm(message, callback) {
    return confirm(message, callback, 'GoGreenRide', ['Yes', 'No']);
  }
}
