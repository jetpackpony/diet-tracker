import React from 'react';
import AddForm from './AddForm';
import { useMutation, useLazyQuery } from '@apollo/client';
import { updateTotals } from '../FoodJournal';
import moment from 'moment';
import {
  AddRecordDocument, AddRecordWithFoodItemDocument,
  SearchFoodItemsDocument, WeeklyRecordsFeedDocument
} from '../../generated/graphql';

export const MIN_LENGTH_TO_SEARCH = 2;

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

const AddFormContainer = () => {
  const [addRecordWithFoodItemMutation] = useMutation(AddRecordWithFoodItemDocument);
  const addRecordWithFoodItem = (rec) => {
    addRecordWithFoodItemMutation({
      variables: { ...rec },
      update: (cache, { data: { addRecordWithFoodItem: newRecord } }) => {
        insertRecordIntoCache(cache, newRecord);
      }
    });
  };

  const [addRecordMutation] = useMutation(AddRecordDocument);
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
  ] = useLazyQuery(SearchFoodItemsDocument);
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