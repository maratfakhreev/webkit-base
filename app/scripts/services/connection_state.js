export default function() {
  if ('ontouchstart' in window && navigator.connection) {
    var states = {};
    var networkState = navigator.connection.type;

    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    return (states[networkState] === 'No network connection') ? false : true;
  }

  return (navigator.onLine) ? true : false;
}
