import React from 'react';
import styles from './WeekHeader.module.css';
import moment from 'moment';

const getDateString = (isoString) => moment(isoString).format("D MMMM");

const WeekHeader = ({
  weekStart,
  weekEnd,
  calDeficit,
}) => {
  return (
    <header className={styles.weekHeader}>
      <h2>{getDateString(weekStart)} - {getDateString(weekEnd)}</h2>
      <div>{calDeficit} left</div>
    </header>
  )
};

export default WeekHeader;