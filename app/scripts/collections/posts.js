import Dates from 'scripts/helpers/dates';
import AppCollection from 'scripts/collections/app';
import Post from 'scripts/models/post';

export default class Posts extends AppCollection {
  constructor(options) {
    this.url = 'posts';
    this.model = Post;

    super(options);
  }

  comparator(model) {
    return -Dates.getTime(model.get('date'));
  }
}
