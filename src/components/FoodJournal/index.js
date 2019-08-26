import React from 'react';
import FoodJournal from './FoodJournal';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const calcTotals = (records) => (
  records.reduce((res, record) => {
    res.totalCal += record.calories;
    res.totalProtein += record.protein;
    res.totalFat += record.fat;
    res.totalCarbs += record.carbs;
    return res;
  }, {
      totalCal: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
    }
  )
);

/**
 * If `a` was eaten later than `b`, `a` comes first in the list
 * If `a` was created later than `b`, `a` comes first in the list
 */
const compareRecords = (a, b) => (
  a.eatenAt === b.eatenAt
    ? a.createdAt > b.createdAt ? -1 : 1
    : a.eatenAt > b.eatenAt ? -1 : 1
);
const getDateTitle = (eatenAt) => (new Date(eatenAt)).toDateString();

const groupRecords = (records) => {
  // Group records by date
  const datesObj = records.reduce((acc, val) => {
    const key = getDateTitle(val.eatenAt)
    acc[key] = acc[key] || [];
    acc[key].push(val);
    return acc;
  }, {});

  // For each date, sort items and add totals
  return Object.keys(datesObj).map((key) => {
    const itemList = datesObj[key].map((item) => {
      return {
        ...item,
        title: item.foodItem.title,
        calories: item.foodItem.calories * item.weight / 100,
        protein:  item.foodItem.protein * item.weight / 100,
        fat: item.foodItem.fat * item.weight / 100,
        carbs: item.foodItem.carbs * item.weight / 100,
      };
    });
    itemList.sort(compareRecords);
    return {
      date: key,
      itemList,
      ...calcTotals(itemList)
    };
  });
};

const GET_ALL_RECORDS = gql`
  query GetPagedRecords($cursor: String) {
    recordsFeed(cursor:$cursor, limit:3) {
      cursor,
      records {
        id,
        foodItem {
          id
          title
          calories
          protein
          fat
          carbs
        }
        weight
        eatenAt
        createdAt
      }
    }
  }
`;

const FoodJournalContainer = ({...props}) => {
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_RECORDS);

  if (error) {
    console.log("Error: ", error);
    return <div>Error (look in the console, dum-dum)</div>;
  }
  if (loading) return <div>Loading...</div>;

  const { cursor, records } = data.recordsFeed;
  const fetchMoreRecords = () => {
    fetchMore({
      query: GET_ALL_RECORDS,
      variables: { cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          recordsFeed: {
            ...prev.recordsFeed,
            cursor: fetchMoreResult.recordsFeed.cursor,
            records: [
              ...prev.recordsFeed.records,
              ...fetchMoreResult.recordsFeed.records
            ]
          }
        };
      }
    });
  };
  return (
    <FoodJournal
      {...props}
      dates={groupRecords(records)}
      fetchMoreRecords={fetchMoreRecords}
    />
  );
};

export default FoodJournalContainer;