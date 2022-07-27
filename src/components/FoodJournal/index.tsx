import FoodJournal from './FoodJournal';
import { useQuery } from '@apollo/client';
import { mapObjArray } from '../../utils';
import { DayRecords, Record, WeeklyRecordsFeedDocument, WeekRecords } from '../../generated/graphql';
import { useUpdateRecord } from '../../hooks/useUpdateRecord';
import { DayRecordsWithCalDeficit, RecordWithMacros, WeekRecordsWithCalDeficit } from '../../types';

const getDailyCaloriesLimit = () => {
  return 2500;
};

const roundField = (key: string, value: any) => {
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
const roundEverything = (weeks: WeekRecordsWithCalDeficit[]): WeekRecordsWithCalDeficit[] => {
  return (mapObjArray(roundField, weeks) as WeekRecordsWithCalDeficit[]);
};

const caclRecordMacros = (rec: Record): RecordWithMacros => {
  return {
    ...rec,
    calories: rec.foodItem.calories * rec.weight * 0.01,
    protein: rec.foodItem.protein * rec.weight * 0.01,
    fat: rec.foodItem.fat * rec.weight * 0.01,
    carbs: rec.foodItem.carbs * rec.weight * 0.01,
  };
};

const calcDayCalDeficit = (day: DayRecords): DayRecordsWithCalDeficit => {
  const records = day.records.map(caclRecordMacros);
  return {
    ...day,
    records,
    calDeficit: getDailyCaloriesLimit() - day.totals.calories
  };
};

const calcWeekCalDeficit = (week: WeekRecords): WeekRecordsWithCalDeficit => {
  const days = week.days.map(calcDayCalDeficit);
  const weekCalDeficit = days.reduce((res, day) => (res + day.calDeficit), 0);
  return {
    ...week,
    days,
    calDeficit: weekCalDeficit
  }
};

const prepareRecords = (weeks: WeekRecords[]) => {
  return roundEverything(weeks.map(calcWeekCalDeficit));
};

const FoodJournalContainer = ({ ...props }) => {
  const updateRecord = useUpdateRecord();

  const { loading, error, data, fetchMore } = useQuery(WeeklyRecordsFeedDocument, {
    variables: { cursor: "" }
  });

  if (error) {
    console.error("Error: ", error);
    return <div>Error (look in the console, dum-dum)</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (!data) {
    console.error("Couldn't load any data: ", data);
    return <div>Error (look in the console, dum-dum)</div>;
  }

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