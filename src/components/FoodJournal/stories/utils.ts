import moment, { Moment } from "moment";
import { DayRecords } from "../../../generated/graphql";
import { mapObjArray } from "../../../utils";

export const changeAllDatesToDate = (targetDate: Moment, day: DayRecords) => {
  return mapObjArray((key, value) => {
    if (typeof value === "string" || typeof value === "number") {
      const date = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true);
      if (date.isValid()) {
        date.set({
          year: targetDate.year(),
          month: targetDate.month(),
          date: targetDate.date(),
        });
        return date.toISOString();
      }
    }
    return value;
  }, day);
};
