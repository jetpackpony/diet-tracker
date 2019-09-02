import React from 'react';
import FoodJournal from './FoodJournal';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { mapObjArray } from '../../utils';

const DAILY_CALORIES_NORMAL = 2370;

const roundField = (key, value) => {
  switch(key) {
    case "calories":
    case "weight":
    case "calDeficit":
      return Math.round(value);
    case "protein":
    case "fat":
    case "carbs":
      return Math.round(value * 100) / 100;
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
          calDeficit: DAILY_CALORIES_NORMAL - day.totals.calories
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

const GET_WEEKLY_FEED = gql`
  query WeeklyRecordsFeed($cursor: String!) {
    weeklyRecordsFeed(cursor: $cursor, limit: 1) {
      cursor
      weeks {
        weekStart
        weekEnd
        totals {
          calories
        }
        days {
          dayStart
          dayEnd
          totals {
            calories
            protein
            fat
            carbs
          }
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
    }
  }
`;

const UPDATE_RECORD = gql`
  mutation UpdateRecord(
    $id: ID!
    $weight: Int!
  ) {
    updateRecord(
      id: $id
      weight: $weight
    ) {
      id
      weight
    }
  }
`;
const DELETE_RECORD = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(id: $id)
  }
`;

const FoodJournalContainer = ({...props}) => {
  const [ updateRecordMut ] = useMutation(UPDATE_RECORD);
  const [ deleteRecordMut ] = useMutation(DELETE_RECORD);
  const updateRecord = ({ id, weight }) => {
    console.log("Updating record: ", {id, weight});
    updateRecordMut({ variables: { id, weight }});
  };
  const deleteRecord = (id) => {
    console.log("Deleting record: ", id);
    deleteRecordMut({ variables: { id }});
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
    />
  );
};

export default FoodJournalContainer;