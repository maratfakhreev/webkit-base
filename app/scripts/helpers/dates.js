import Moment from 'moment-timezone';

var NY_TIMEZONE = 'America/New_York';

export default class DatesHelper {
  static convertToJSONDate(date, time) {
    if (date === '') return null;
    if (time === '') time = '00:00';
    var currentTime = Moment(`${date} ${time}`).format();
    return Moment.tz(currentTime, NY_TIMEZONE).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  static convertToFormattedTime(date) {
    Moment(date).format('h:mm A');
  }

  static convertToFormattedDate(date) {
    Moment(date).format('MM/DD/YYYY')
  }

  static currentTime() {
    Moment.tz(NY_TIMEZONE).format('YYYY-MM-DDTHH:mm:ssZ')
  }

  static calcDateWithOffset(offsetTime) {
    d = Moment.tz(NY_TIMEZONE);
    d.minutes(d.minutes() + offsetTime);
    return d;
  }
}
