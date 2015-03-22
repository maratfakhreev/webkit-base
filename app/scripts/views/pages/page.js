import template from 'templates/pages/page';

export default class PageView extends Marionette.ItemView {
  constructor(options) {
    this.template = template;

    super(options);
  }
}
