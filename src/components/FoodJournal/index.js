import React from 'react';
import FoodJournal from './FoodJournal';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { mapObjArray } from '../../utils';
import { GET_WEEKLY_FEED, UPDATE_RECORD, DELETE_RECORD, ADD_RECORD } from '../../queries';
import { insertRecordIntoCache } from '../AddForm';
import moment from 'moment';

const getDailyCaloriesLimit = () => {
  return 2500;
};

const roundField = (key, value) => {
  switch(key) {
    case "calories":
    case "weight":
    case "calDeficit":
      return Math.round(value);
    case "protein":
    case "fat":
    case "carbs":
      return Math.round(value * 10) / 10;
    default:
      return value;
  }
};
const roundEverything = (obj) => {
  return mapObjArray(roundField, obj);
};

const prepareRecords = (weeks) => {
  return roundEverything(
    weeks.map((week) => {
      const days = week.days.map((day) => {
        const records = day.records.map((rec) => {
          return {
            ...rec,
            calories: rec.foodItem.calories * rec.weight * 0.01,
            protein: rec.foodItem.protein * rec.weight * 0.01,
            fat: rec.foodItem.fat * rec.weight * 0.01,
            carbs: rec.foodItem.carbs * rec.weight * 0.01,
          };
        });
        return {
          ...day,
          records,
          calDeficit: getDailyCaloriesLimit() - day.totals.calories
        };
      });
      const weekCalDeficit = days.reduce((res, day) => (res + day.calDeficit), 0);

      return {
        ...week,
        days,
        calDeficit: weekCalDeficit
      }
    })
  );
};

export const updateTotals = (weeks) => {
  return weeks.map((week) => {
    const days = week.days.map((day) => {
      const totals = day.records.reduce((acc, rec) => {
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

const updateCachedTotals = (cache, data) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: GET_WEEKLY_FEED, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(weeklyRecordsFeed.weeks)
    }
  };
  cache.writeQuery({
    query: GET_WEEKLY_FEED,
    variables: { cursor: "" },
    data: newData
  });
};

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

const removeRecordFromCache = (cache, { data: { deleteRecord: recId }}) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: GET_WEEKLY_FEED, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(deleteRecord(weeklyRecordsFeed.weeks, recId))
    }
  };
  cache.writeQuery({
    query: GET_WEEKLY_FEED,
    variables: { cursor: "" },
    data: newData
  });
};

const FoodJournalContainer = ({...props}) => {
  const [ updateRecordMut ] = useMutation(UPDATE_RECORD);
  const [ deleteRecordMut ] = useMutation(DELETE_RECORD);
  const [ addRecordMut ] = useMutation(ADD_RECORD);
  const updateRecord = ({ id, weight }) => {
    console.log("Updating record: ", {id, weight});
    updateRecordMut({
      variables: { id, weight },
      update: updateCachedTotals
    });
  };
  const deleteRecord = (id) => {
    console.log("Deleting record: ", id);
    deleteRecordMut({
      variables: { id },
      update: removeRecordFromCache
    });
  };
  const cloneRecord = (foodItemID) => {
    console.log("Cloning record with food item: ", foodItemID);
    addRecordMut({
      variables: {
        foodItemID,
        weight: 0,
        eatenAt: moment().toISOString(),
        createdAt: moment().toISOString()
      },
      update: (cache, { data: { addRecord: newRecord } }) => {
        insertRecordIntoCache(cache, newRecord);
      }
    });
  };

  const { loading, error, data, fetchMore } = useQuery(GET_WEEKLY_FEED, {
    variables: { cursor: "" }
  });

  if (error) {
    console.log("Error: ", error);
    return <div>Error (look in the console, dum-dum)</div>;
  }
  if (loading) return <div>Loading...</div>;

  const { cursor, weeks } = data.weeklyRecordsFeed;
  const fetchMoreRecords = () => {
    fetchMore({
      query: GET_WEEKLY_FEED,
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          weeklyRecordsFeed: {
            ...prev.weeklyRecordsFeed,
            cursor: fetchMoreResult.weeklyRecordsFeed.cursor,
            weeks: [
              ...prev.weeklyRecordsFeed.weeks,
              ...fetchMoreResult.weeklyRecordsFeed.weeks
            ]
          }
        };
      }
    });
  };
  return (
    <FoodJournal
      {...props}
      weeks={prepareRecords(weeks)}
      fetchMoreRecords={fetchMoreRecords}
      updateRecord={updateRecord}
      deleteRecord={deleteRecord}
      cloneRecord={cloneRecord}
    />
  );
};

export default FoodJournalContainer;