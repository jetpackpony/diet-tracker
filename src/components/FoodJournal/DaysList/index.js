import React from 'react';
import moment from 'moment';
import styles from './DaysList.module.css';
import RecordLine from '../RecordLine';
import DayHeader from '../DayHeader';

const isCurrent = (dateStr) => {
  const date = moment(dateStr);
  return moment().isBetween(date, date.clone().add(1, "day"));
}

const DaysList = ({ days, updateRecord, deleteRecord, cloneRecord }) => (
  <ol className={styles.list}>
    {
      days.map((day, j) => (
        <li
          key={j}
          className={[styles.day, isCurrent(day.dayStart) ? styles.current : ""].join(" ")}
        >
          <DayHeader
            dayStart={day.dayStart}
            totals={day.totals}
            calDeficit={day.calDeficit}
          />
          <ol>
            {
              day.records.map((rec) => (
                <RecordLine
                  key={rec.id}
                  {...rec}
                  updateRecord={updateRecord}
                  deleteRecord={deleteRecord}
                  cloneRecord={cloneRecord}
                />
              ))
            }
          </ol>
        </li>
      ))
    }
  </ol>
);

export default DaysList;