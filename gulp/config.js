module.exports = {
  appDir: 'app',
  publicDir: 'build/www',
  buildDir: 'build',
  env: 'development', // development | production
  platform: 'ios', // ios | android | browser
  precompile: true, // true | false
  precompileType: 'prepare', // prepare | compile | build | run
  ports: {
    server: 8000,
    mocks: 8001,
    test: 9999
  },
  isDevelopment: function() {
    return this.env === 'development';
  },
  isProduction: function() {
    return this.env === 'production';
  }
}
