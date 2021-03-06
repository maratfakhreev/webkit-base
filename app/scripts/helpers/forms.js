export default class FormsHelper {
  static isPhoneNumber(input) {
    let regexp = /^[0-9()\-+ ]+$/;
    if (regexp.test(input)) return true;
    return false;
  }

  static isValidEmail(input) {
    let regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regexp.test(input)) return true;
    return false;
  }
}
