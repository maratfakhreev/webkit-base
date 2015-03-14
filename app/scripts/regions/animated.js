export default class AnimatedRegion extends Marionette.Region {
  constructor(options) {
    super(options);

    this.animation = options.animation;
  }

  attachHtml(view) {
    this.$el
      .hide(0)
      .html(view.el)
      .velocity('stop');

    _.each(this.animation.showAnimation, (value, key) => {
      this.$el.velocity(value.p, value.o);
    });
  }

  empty() {
    var view = this.currentView;
    if (!view) return;
    this.$el.velocity('stop');

    if (this.animation.hideAnimation) {
      var itter = 0;
      var length = this.animation.hideAnimation.length;

      _.each(this.animation.showAnimation, (value, key) => {
        $.Velocity.animate(
          this.$el,
          value.p,
          value.o
        ).then(() => {
          itter++;
          if (itter === length) this._emptyRegion(view);
        });
      });
    }
    else {
      this._emptyRegion(view);
    }
  }

  _emptyRegion(view) {
    view.off('destroy', this.empty, this);
    this.triggerMethod('before:empty', view);
    this._destroyView();
    this.triggerMethod('empty', view);
    delete this.currentView;
    return this;
  }
}
