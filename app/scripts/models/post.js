import AppModel from 'scripts/models/app';

export default class Post extends AppModel {
  constructor(options) {
    this.urlRoot = 'posts';

    super(options);
  }

  postToTwitter() {
    let twitter = OAuth.create('twitter');
    twitter.post('/1.1/statuses/update.json', {
      data: {
        status: this.get('message'),
        lat: this.get('coordinates.lat'),
        long: this.get('coordinates.long'),
      }
    });
  }

  postToFacebook() {
    let facebook = OAuth.create('facebook');
    facebook.post('/v2.3/status-id', {
      data: {
        message: this.get('message'),
        place: {
          location: {
            latitude: this.get('coordinates.lat'),
            longitude: this.get('coordinates.long')
          }
        }
      }
    });
  }
}
