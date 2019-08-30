import moment from 'moment';
import { mapObjArray } from '../../../utils';

export const changeAllDatesToDate = (targetDate, day) => {
  return mapObjArray((key, value) => {
    const date = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true);
    if (date.isValid()) {
      date.set({
        'year': targetDate.year(),
        'month': targetDate.month(),
        'date': targetDate.date()
      });
      return date.toISOString();
    } else {
      return value;
    }
  }, day);
};
