import FoodJournal from './FoodJournal';
import { useQuery } from '@apollo/client';
import { mapObjArray } from '../../utils';
import { WeeklyRecordsFeedDocument } from '../../generated/graphql';
import { useUpdateRecord } from '../../hooks/useUpdateRecord';

const getDailyCaloriesLimit = () => {
  return 2500;
};

const roundField = (key, value) => {
  switch (key) {
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

const FoodJournalContainer = ({ ...props }) => {
  const updateRecord = useUpdateRecord();

  const { loading, error, data, fetchMore } = useQuery(WeeklyRecordsFeedDocument, {
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
      query: WeeklyRecordsFeedDocument,
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
    />
  );
};

export default FoodJournalContainer;