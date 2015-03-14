export default class FormsHelper {
  static isPhoneNumber(input) {
    var regexp = /^[0-9()\-+ ]+$/;
    if (regexp.test(input)) return true;
    return false;
  }

  static isValidZipcode(input) {
    var regexp = /^\d{5}(-\d{4})?$/;
    if (regexp.test(input)) return true;
    return false;
  }

  static isValidEmail(input) {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regexp.test(input)) return true;
    return false;
  }

  static formatDID(did) {
    return `+${did.substr(0, 1)} (${did.substr(1, 3)}) ${did.substr(4, 3)}-${did.substr(7, 4)}`;
  }
}
