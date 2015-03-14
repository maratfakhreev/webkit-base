import App from 'scripts/application';
import Router from 'scripts/routers/main';
import Controller from 'scripts/controllers/main_controller';

var Main = App.module('Main');

Main.addInitializer(function() {
  this.controller = new Controller();
  this.router = new Router({controller: this.controller});
});

export default Main;
