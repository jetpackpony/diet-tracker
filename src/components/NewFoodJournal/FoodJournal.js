import React from 'react';
import styles from './FoodJournal.module.css';
import WeekHeader from './WeekHeader';
import DaysList from './DaysList';
import Button from '../Button';

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
      <Button className={styles.loadMore} onClick={fetchMoreRecords}>
        Load More
      </Button>
    </section>
  )
};

export default FoodJournal;