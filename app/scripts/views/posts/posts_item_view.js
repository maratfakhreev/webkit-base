import Dates from 'scripts/helpers/dates';
import template from 'templates/posts/posts_item';

export default class PostsItemView extends Marionette.ItemView {
  constructor(options) {
    this.tagName = 'li';
    this.className = 'posts-item';
    this.template = template;

    this.ui = {
      swipeInner: '.swipe-item-inner',
      deleteButton: '.delete'
    };

    this.events = {
      'swipeleft': 'onShowSwipedPart',
      'swiperight': 'onHideSwipedPart',
      'tap @ui.deleteButton': 'onDeleteItem'
    };

    this.templateHelpers = {
      dateHumanize: function(date) {
        return Dates.convertToFormattedDateTime(date);
      }
    };

    super(options);
  }

  onHideSwipedPart(event, data) {
    if (this.ui.swipeInner.hasClass('swiped')) {
      event.stopPropagation();
      this.ui.swipeInner.removeClass('swiped');
    }
  }

  onShowSwipedPart(event, data) {
    event.stopPropagation();
    this.ui.swipeInner.addClass('swiped');
  }

  onDeleteItem() {
    this.model.destroy();
  }
}
