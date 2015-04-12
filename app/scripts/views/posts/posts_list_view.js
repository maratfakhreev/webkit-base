import PostsItemView from 'scripts/views/posts/posts_item_view';
import template from 'templates/posts/posts';

export default class PostsListView extends Marionette.CompositeView {
  constructor(options) {
    this.template = template;
    this.childViewContainer = '.posts-list';
    this.childView = PostsItemView;

    super(options);
  }

  onBeforeAddChild(childView) {
    if (childView.model.has('id')) {
      childView.options.index = childView._index + 1;
    }
  }
}
