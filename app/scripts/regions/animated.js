class AnimatedRegion extends Marionette.Region {
  constructor(options) {
    super(options);

    this.animation = options.animation;
  }

  attachHtml(view) {
    this.$el
      .css({ display: 'none' })
      .html(view.el)
      .velocity('stop');

    if (this.animation && this.animation.showAnimation) {
      this._iterateOverAnimations(this.animation.showAnimation, function() {
        AnimatedRegion.trigger('region:showed', this);
      });
    }
    else {
      this.$el.css({ display: 'block' });
    }
  }

  empty() {
    let view = this.currentView;
    if (!view) return;
    this.$el.velocity('stop');

    if (this.animation && this.animation.hideAnimation) {
      this._iterateOverAnimations(this.animation.hideAnimation, function() {
        this._emptyRegion(view);
        this.$el.removeAttr('style');
        AnimatedRegion.trigger('region:removed', this);
      });
    }
    else {
      this._emptyRegion(view);
    }
  }

  _iterateOverAnimations(animations, callback) {
    let iterator = 0;
    let length = animations.length;

    _.each(animations, (value, key) => {
      $.Velocity.animate(this.$el, value.p, value.o).then(() => {
        iterator++;
        if (iterator === length) callback.call(this);
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
