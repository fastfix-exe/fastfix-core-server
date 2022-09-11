import * as moment from 'moment-timezone';

const timeZone = "Asia/Ho_Chi_Minh";

export function getSystemDateTime () {
    return moment.tz(new Date(), timeZone).format('YYYY-MM-DD HH:mm:ss');
}