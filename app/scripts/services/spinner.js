const ANIMATION_SPEED = 300;

export default class Spinner {
  static init() {
    NProgress.configure({
      showSpinner: false,
      parent: '.horizontal-spinner'
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
    if ($('.horizontal-spinner').length !== 0) NProgress.done();
  }

  static show() {
    if ($('.horizontal-spinner').length !== 0) NProgress.start();
  }
}
