import FoodJournal from './FoodJournal';
import { connect } from 'react-redux';

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

const compareRecords = (a, b) => a.datetime < b.datetime ? -1 : 1;
const getDateTitle = (datetime) => (new Date(datetime)).toDateString();

const groupRecords = (records) => {
  // Group records by date
  const datesObj = records.reduce((acc, val) => {
    const key = getDateTitle(val.datetime)
    acc[key] = acc[key] || [];
    acc[key].push(val);
    return acc;
  }, {});

  // For each date, sort items and add totals
  return Object.keys(datesObj).map((key) => ({
    date: key,
    itemList: datesObj[key].sort(compareRecords),
    ...calcTotals(datesObj[key])
  }));
};

const mapStateToProps = (state) => {
  return { dates: groupRecords(state.records) };
};

export default connect(mapStateToProps)(FoodJournal);