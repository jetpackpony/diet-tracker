import { ApolloCache } from "@apollo/client";
import moment from "moment";
import { WeeklyRecordsFeedDocument } from "../generated/graphql";

const deleteRecord = (weeks, recId) => {
  const res = weeks.map((week) => {
    return {
      ...week,
      days: week.days.map((day) => {
        return {
          ...day,
          records: day.records.filter((rec) => rec.id !== recId)
        };
      })
    };
  });
  return res;
};

const updateTotals = (weeks) => {
  return weeks.map((week) => {
    const days = week.days.map((day) => {
      const totals = day.records.reduce((acc, rec) => {
        if (rec.weight <= 0) {
          return acc;
        }
        return {
          ...acc,
          calories: acc.calories + rec.foodItem.calories * rec.weight * 0.01,
          protein: acc.protein + rec.foodItem.protein * rec.weight * 0.01,
          fat: acc.fat + rec.foodItem.fat * rec.weight * 0.01,
          carbs: acc.carbs + rec.foodItem.carbs * rec.weight * 0.01
        };
      }, {
        ...day.totals,
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0
      });
      return {
        ...day,
        totals
      };
    });
    const totals = week.days.reduce((acc, day) => {
      return {
        ...acc,
        calories: acc.calories + day.totals.calories,
        protein: acc.protein + day.totals.protein,
        fat: acc.fat + day.totals.fat,
        carbs: acc.carbs + day.totals.carbs
      };
    }, {
      ...week.totals,
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0
    });
    return {
      ...week,
      days,
      totals
    };
  });
};

export const updateCachedTotals = (cache, data) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: WeeklyRecordsFeedDocument, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(weeklyRecordsFeed.weeks)
    }
  };
  cache.writeQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
    data: newData
  });
};

export const removeRecordFromCache = (cache: ApolloCache<any>, recId: string) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: WeeklyRecordsFeedDocument, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(deleteRecord(weeklyRecordsFeed.weeks, recId))
    }
  };
  cache.writeQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
    data: newData
  });
};

export const insertRecordIntoCache = (cache, newRecord) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: WeeklyRecordsFeedDocument, variables: { cursor: "" } });

  const newWeeks = weeklyRecordsFeed.weeks.map((week) => {
    if (moment(newRecord.eatenAt).isBetween(week.weekStart, week.weekEnd)) {
      return {
        ...week,
        days: week.days.map((day) => {
          if (moment(newRecord.eatenAt).isBetween(day.dayStart, day.dayEnd)) {
            return {
              ...day,
              records: ([
                ...day.records,
                newRecord
              ]).sort((a, b) => {
                const diff = moment(b.eatenAt) - moment(a.eatenAt);
                if (diff === 0) {
                  const diffCreate = moment(b.createdAt) - moment(a.createdAt);
                  return diffCreate;
                } else {
                  return diff;
                }
              })
            };
          } else {
            return day;
          }
        })
      };
    } else {
      return week;
    }
  });
  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(newWeeks)
    }
  };
  cache.writeQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
    data: newData
  });
};