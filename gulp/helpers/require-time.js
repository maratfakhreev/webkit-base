var modules = require('fs').readdirSync('node_modules').filter(function(name) {
  return name !== '.bin' && name !== '.DS_Store'
});

modules.forEach(function(m) {
  console.time(m);
  require(m);
  console.timeEnd(m);
});
