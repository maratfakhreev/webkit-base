module.exports = {
  appDir: 'app',
  publicDir: 'build/www',
  buildDir: 'build',
  env: 'development', // development | production
  platform: 'desktop', // ios | android
  preparing: true, // true | false
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
