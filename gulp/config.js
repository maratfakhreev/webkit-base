var Config = (function() {
  function Config() {};

  Config.appDir = 'app';
  Config.publicDir = 'build/www';
  Config.buildDir = 'build';
  Config.env = 'development';
  Config.platform = 'ios';
  Config.needPreparing = false;
  Config.ports = {
    server: 8000,
    mocks: 8001,
    test: 9999
  };

  Config.isDevelopment = function() {
    return this.env === 'development';
  };

  Config.isProduction = function() {
    return this.env === 'production';
  };

  return Config;
})();

module.exports = Config;
