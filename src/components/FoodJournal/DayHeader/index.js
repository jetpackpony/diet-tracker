import React from 'react';
import styles from './DayHeader.module.css';
import moment from 'moment';

const getDateString = (isoString) => moment(isoString).format("D MMMM");

const DayHeader = ({
  dayStart,
  totals: {
    calories,
    protein,
    fat,
    carbs,
  },
  calDeficit
}) => {
  return (
    <header className={styles.dayHeader}>
      <span>
        <h3>{getDateString(dayStart)}</h3>
        <div className={styles.subtext}>
          {calories} ccal {protein} / {fat} / {carbs}
        </div>
      </span>
      <span>
        <div>{calDeficit} left</div>
      </span>
    </header>
  )
};

export default DayHeader;