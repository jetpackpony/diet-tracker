import React from 'react';
import styles from './FoodJournal.module.css';
import WeekHeader from './WeekHeader';
import DaysList from './DaysList';

const FoodJournal = ({ weeks, fetchMoreRecords }) => {
  return (
    <section className={styles.foodJournal}>
      <ol>
        {
          weeks.map((week, i) => (
            <li key={i} className={styles.week}>
              <WeekHeader
                weekStart={week.weekStart}
                weekEnd={week.weekEnd}
                calDeficit={week.calDeficit}
              />
              <DaysList days={week.days} />
            </li>
          ))
        }
      </ol>
      <button onClick={fetchMoreRecords}>Load More</button>
    </section>
  )
};

export default FoodJournal;