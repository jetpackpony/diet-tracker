import React from 'react';
import FoodJournal from './FoodJournal';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DAILY_CALORIES_NORMAL = 2370;

const prepareRecords = (weeks) => {
  return weeks.map((week) => {
    const days = week.days.map((day) => {
      return {
        ...day,
        calDeficit: DAILY_CALORIES_NORMAL - day.totals.calories
      };
    });
    const weekCalDeficit = days.reduce((res, day) => (res + day.calDeficit), 0);

    return {
      ...week,
      days,
      calDeficit: weekCalDeficit
    }
  });
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

const FoodJournalContainer = ({...props}) => {
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
    />
  );
};

export default FoodJournalContainer;