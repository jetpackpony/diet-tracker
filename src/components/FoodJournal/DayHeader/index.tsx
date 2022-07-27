import React from 'react';
import styles from './DayHeader.module.css';
import moment from 'moment';
import { Totals } from '../../../generated/graphql';

interface DayHeaderProps {
  dayStart: string,
  totals: Totals,
  calDeficit: number
};

const getDateString = (isoString: string) => moment(isoString).format("ddd, D MMMM");

const DayHeader = ({
  dayStart,
  totals: {
    calories,
    protein,
    fat,
    carbs,
  },
  calDeficit
}: DayHeaderProps) => {
  return (
    <header className={styles.dayHeader}>
      <span>
        <h3>{getDateString(dayStart)}</h3>
      </span>
      <span className={styles.right}>
        <div>{calDeficit} left</div>
        <div className={styles.subtext}>
          {calories} cal {protein} / {fat} / {carbs}
        </div>
      </span>
    </header>
  )
};

export default DayHeader;