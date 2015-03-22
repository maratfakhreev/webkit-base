export default class AbstractFormView extends Marionette.ItemView {
  constructor(options) {
    super(options);

    this.bindValidation();
  }

  onRender() {
    this.stickit();
  }

  onDestroy() {
    this.unbindValidation();
  }

  bindValidation() {
    Backbone.Validation.bind(this, {forceUpdate: true});
  }

  unbindValidation() {
    Backbone.Validation.unbind(this);
  }
}
