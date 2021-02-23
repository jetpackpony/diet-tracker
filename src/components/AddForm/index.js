import React from 'react';
import AddForm from './AddForm';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  ADD_RECORD, ADD_RECORD_WITH_FOOD_ITEM,
  SEARCH_FOOD_ITEMS, GET_WEEKLY_FEED
} from '../../queries';
import { updateTotals } from '../FoodJournal';
import moment from 'moment';

export const MIN_LENGTH_TO_SEARCH = 2;

export const insertRecordIntoCache = (cache, newRecord) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: GET_WEEKLY_FEED, variables: { cursor: "" } });

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
    query: GET_WEEKLY_FEED,
    variables: { cursor: "" },
    data: newData
  });
};

const AddFormContainer = () => {
  const [addRecordWithFoodItemMutation] = useMutation(ADD_RECORD_WITH_FOOD_ITEM);
  const addRecordWithFoodItem = (rec) => {
    addRecordWithFoodItemMutation({
      variables: { ...rec },
      update: (cache, { data: { addRecordWithFoodItem: newRecord } }) => {
        insertRecordIntoCache(cache, newRecord);
      }
    });
  };

  const [addRecordMutation] = useMutation(ADD_RECORD);
  const addRecord = (rec) => {
    addRecordMutation({
      variables: { ...rec },
      update: (cache, { data: { addRecord: newRecord } }) => {
        insertRecordIntoCache(cache, newRecord);
      }
    });
  };

  const [
    search,
    {
      loading: isSearching,
      data: searchData
    }
  ] = useLazyQuery(SEARCH_FOOD_ITEMS);
  const searchFoodItem = (filter) => {
    console.log("Searching for: ", filter);
    search({ variables: { filter } });
  };

  return (
    <AddForm
      addRecordWithFoodItem={addRecordWithFoodItem}
      addRecord={addRecord}
      isSearching={isSearching}
      foundFoodItems={searchData && searchData.filterFoodItems}
      searchFoodItem={searchFoodItem}
    />
  );
};

export default AddFormContainer;