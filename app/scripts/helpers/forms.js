export default class FormsHelper {
  static isPhoneNumber(input) {
    var regexp = /^[0-9()\-+ ]+$/;
    if (regexp.test(input)) return true;
    return false;
  }

  static isValidEmail(input) {
    var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regexp.test(input)) return true;
    return false;
  }
}
