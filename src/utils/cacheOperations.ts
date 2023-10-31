import { ApolloCache } from "@apollo/client";
import moment from "moment";
import {
  Record,
  WeeklyRecordsFeedDocument,
  WeekRecords,
} from "../generated/graphql";

const deleteRecord = (weeks: WeekRecords[], recId: string) => {
  const res = weeks.map((week) => {
    return {
      ...week,
      days: week.days.map((day) => {
        return {
          ...day,
          records: day.records.filter((rec) => rec.id !== recId),
        };
      }),
    };
  });
  return res;
};

const updateTotals = (weeks: WeekRecords[]) => {
  return weeks.map((week) => {
    const days = week.days.map((day) => {
      const totals = day.records.reduce(
        (acc, rec) => {
          if (rec.weight <= 0) {
            return acc;
          }
          return {
            ...acc,
            calories: acc.calories + rec.foodItem.calories * rec.weight * 0.01,
            protein: acc.protein + rec.foodItem.protein * rec.weight * 0.01,
            fat: acc.fat + rec.foodItem.fat * rec.weight * 0.01,
            carbs: acc.carbs + rec.foodItem.carbs * rec.weight * 0.01,
          };
        },
        {
          ...day.totals,
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
        },
      );
      return {
        ...day,
        totals,
      };
    });
    const totals = week.days.reduce(
      (acc, day) => {
        return {
          ...acc,
          calories: acc.calories + day.totals.calories,
          protein: acc.protein + day.totals.protein,
          fat: acc.fat + day.totals.fat,
          carbs: acc.carbs + day.totals.carbs,
        };
      },
      {
        ...week.totals,
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      },
    );
    return {
      ...week,
      days,
      totals,
    };
  });
};

export const updateCachedTotals = (cache: ApolloCache<any>) => {
  const weeklyRecordsFeedQuery = cache.readQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
  });
  if (weeklyRecordsFeedQuery) {
    const newData = {
      weeklyRecordsFeed: {
        ...weeklyRecordsFeedQuery.weeklyRecordsFeed,
        weeks: updateTotals(weeklyRecordsFeedQuery.weeklyRecordsFeed.weeks),
      },
    };
    cache.writeQuery({
      query: WeeklyRecordsFeedDocument,
      variables: { cursor: "" },
      data: newData,
    });
  }
};

export const removeRecordFromCache = (
  cache: ApolloCache<any>,
  recId: string,
) => {
  const weeklyRecordsFeedQuery = cache.readQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
  });
  if (weeklyRecordsFeedQuery) {
    const newData = {
      weeklyRecordsFeed: {
        ...weeklyRecordsFeedQuery.weeklyRecordsFeed,
        weeks: updateTotals(
          deleteRecord(weeklyRecordsFeedQuery.weeklyRecordsFeed.weeks, recId),
        ),
      },
    };
    cache.writeQuery({
      query: WeeklyRecordsFeedDocument,
      variables: { cursor: "" },
      data: newData,
    });
  }
};

export const insertRecordIntoCache = (
  cache: ApolloCache<any>,
  newRecord: Record,
) => {
  const weeklyRecordsFeedQuery = cache.readQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
  });
  if (weeklyRecordsFeedQuery) {
    const newWeeks = weeklyRecordsFeedQuery.weeklyRecordsFeed.weeks.map(
      (week) => {
        if (moment(newRecord.eatenAt).isBetween(week.weekStart, week.weekEnd)) {
          return {
            ...week,
            days: week.days.map((day) => {
              if (
                moment(newRecord.eatenAt).isBetween(day.dayStart, day.dayEnd)
              ) {
                return {
                  ...day,
                  records: [...day.records, newRecord].sort((a, b) => {
                    const diff = moment(b.eatenAt).diff(moment(a.eatenAt));
                    if (diff === 0) {
                      const diffCreate = moment(b.createdAt).diff(
                        moment(a.createdAt),
                      );
                      return diffCreate;
                    } else {
                      return diff;
                    }
                  }),
                };
              } else {
                return day;
              }
            }),
          };
        } else {
          return week;
        }
      },
    );
    const newData = {
      weeklyRecordsFeed: {
        ...weeklyRecordsFeedQuery.weeklyRecordsFeed,
        weeks: updateTotals(newWeeks),
      },
    };
    cache.writeQuery({
      query: WeeklyRecordsFeedDocument,
      variables: { cursor: "" },
      data: newData,
    });
  }
};
