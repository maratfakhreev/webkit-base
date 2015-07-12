import App from 'scripts/application';
import Router from 'scripts/routers/main';
import Controller from 'scripts/controllers/main_controller';

class Main extends Marionette.Module {
  constructor(options, moduleName, app) {
    this.startWithParent = true;

    super(options, moduleName, app);
  }

  onBeforeStart() {
    let controller = new Controller();
    this.router = new Router({ controller });
  }
}

App.module('Main', Main);

export default Main;
