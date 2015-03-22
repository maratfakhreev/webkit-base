class AnimatedRegion extends Marionette.Region {
  constructor(options) {
    super(options);

    this.animation = options.animation;
  }

  attachHtml(view) {
    this.$el
      .hide(0)
      .html(view.el)
      .velocity('stop');

    this._itterateOverAnimations(this.animation.showAnimation, function() {
      AnimatedRegion.trigger('region:shows', this);
    });
  }

  empty() {
    var view = this.currentView;
    if (!view) return;
    this.$el.velocity('stop');

    if (this.animation.hideAnimation) {
      this._itterateOverAnimations(this.animation.hideAnimation, function() {
        this._emptyRegion(view);
        this.$el.removeAttr('style');
        AnimatedRegion.trigger('region:removed', this);
      });
    }
    else {
      this._emptyRegion(view);
    }
  }

  _itterateOverAnimations(animations, callback) {
    var itter = 0;
    var length = animations.length;

    _.each(animations, (value, key) => {
      $.Velocity.animate(this.$el, value.p, value.o).then(() => {
        itter++;
        if (itter === length) callback();
      });
    });
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

_.extend(AnimatedRegion, Backbone.Events);

export default AnimatedRegion;
