import React from 'react';
import styles from './FoodJournal.module.css';
import WeekHeader from './WeekHeader';
import DaysList from './DaysList';
import Button from '../Button';

const FoodJournal = ({
  weeks,
  fetchMoreRecords,
  updateRecord
}) => {
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
              <DaysList
                days={week.days}
                updateRecord={updateRecord}
              />
            </li>
          ))
        }
      </ol>
      <Button
        className={styles.loadMore}
        onClick={fetchMoreRecords}
        text="Load More"
      />
    </section>
  )
};

export default FoodJournal;