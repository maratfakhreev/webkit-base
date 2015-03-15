module.exports = function(callback, ms) {
  var timeout = null;

  return function() {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, ms);
  };
}
