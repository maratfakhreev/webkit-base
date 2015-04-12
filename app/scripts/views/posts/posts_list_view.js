import Vent from 'scripts/services/event_aggregator';
import PostsItemView from 'scripts/views/posts/posts_item_view';
import template from 'templates/posts/posts';

export default class PostsListView extends Marionette.CompositeView {
  constructor(options) {
    this.template = template;
    this.childViewContainer = '.posts-list';
    this.childView = PostsItemView;

    super(options);

    this.ui = {
      postItemInner: '.swipe-item-inner'
    };

    this.listenTo(Vent, 'swipe:hide', this.onHideAllSwipeElements);
  }

  onRender() {
    this.bindUIElements();
  }

  onBeforeAddChild(childView) {
    if (childView.model.has('id')) {
      childView.options.index = childView._index + 1;
    }
  }

  onHideAllSwipeElements() {
    this.ui.postItemInner.removeClass('swiped');
  }
}
