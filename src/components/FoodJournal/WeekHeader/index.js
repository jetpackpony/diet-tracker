import React from 'react';
import styles from './WeekHeader.module.css';
import moment from 'moment';

const weekHeaderFormat = "D MMMM";

const WeekHeader = ({
  weekStart,
  weekEnd,
  calDeficit,
}) => {
  const newStart = moment(weekStart).add(6, "hours");
  const newEnd = moment(weekEnd).subtract(6, "hours");
  return (
    <header className={styles.weekHeader}>
      <h2>
        {newStart.format(weekHeaderFormat)} - {newEnd.format(weekHeaderFormat)}
      </h2>
      <div>{calDeficit} left</div>
    </header>
  )
};

export default WeekHeader;