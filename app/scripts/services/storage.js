const storage = localStorage;

export default class Storage {
  static set(key, data) {
    var data = JSON.stringify(data);
    storage.setItem(key, data);
  }

  static get(key) {
    var data = storage.getItem(key);
    return JSON.parse(data);
  }

  static remove(key) {
    storage.removeItem(key);
  }

  static clear() {
    storage.clear();
  }
}
