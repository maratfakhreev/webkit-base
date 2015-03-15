import template from 'templates/layouts/landing';

export default class LandingLayout extends Marionette.LayoutView {
  constructor(options) {
    this.template = template;

    super(options);
  }
}
