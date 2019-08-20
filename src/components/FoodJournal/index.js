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

const compareRecords = (a, b) => a.eatenAt < b.eatenAt ? -1 : 1;
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
  query GetAllRecords {
    getAllRecords {
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
      createdAt
      eatenAt
    }
  }
`;

const FoodJournalContainer = ({...props}) => {
  const { loading, error, data } = useQuery(GET_ALL_RECORDS);

  if (error) {
    console.log("Error: ", error);
    return <div>Error (look in the console, dum-dum)</div>;
  }
  if (loading) return <div>Loading...</div>;

  return <FoodJournal {...props} dates={groupRecords(data.getAllRecords)} />;
};

export default FoodJournalContainer;