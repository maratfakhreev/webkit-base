import Moment from 'moment-timezone';

const TIMEZONE = null;

export default class DatesHelper {
  static convertToJSONDate(date, time) {
    if (date === '') return null;
    if (time === '') time = '00:00';
    var currentTime = Moment(`${date} ${time}`).format();
    return Moment.tz(currentTime, TIMEZONE).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  static convertToFormattedTime(date) {
    return Moment(date).format('h:mm A');
  }

  static convertToFormattedDate(date) {
    return Moment(date).format('MMMM Do YYYY');
  }

  static convertToFormattedDateTime(date) {
    return Moment(date).format('MMMM Do YYYY, h:mm A');
  }

  static currentTime() {
    return Moment.tz(TIMEZONE).format('YYYY-MM-DDTHH:mm:ssZ');
  }

  static calcDateWithOffset(offsetTime) {
    d = Moment.tz(TIMEZONE);
    d.minutes(d.minutes() + offsetTime);
    return d;
  }
}
