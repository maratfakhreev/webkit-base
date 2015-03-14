const ANIMATION_SPEED = 300

export default class Spinner {
  static init() {
    NProgress.configure({
      showSpinner: false,
      parent: '.screen-inner'
    });
    this.$spin = $('#spinner');
    this.spinHide();
  }

  static spinShow() {
    this.$spin.velocity('fadeIn', {duration: 0});
  }

  static spinHide() {
    this.$spin.velocity('fadeOut', {duration: ANIMATION_SPEED});
  }

  static hide() {
    if ($('.screen-inner').length !== 0) NProgress.done();
  }

  static show() {
    if ($('.screen-inner').length !== 0) NProgress.start();
  }
}
