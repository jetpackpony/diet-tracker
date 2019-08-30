import React from 'react';
import styles from './FoodJournal.module.css';
import RecordLine from './RecordLine';
import DayHeader from './DayHeader';
import WeekHeader from './WeekHeader';

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
              <ol>
                {
                  week.days.map((day, j) => (
                    <li key={j} className={styles.day}>
                      <DayHeader
                        dayStart={day.dayStart}
                        totals={day.totals}
                        calDeficit={day.calDeficit}
                      />
                      <ol className={styles.recordList}>
                        {
                          day.records.map((rec) => (
                            <RecordLine key={rec.id} {...rec} />
                          ))
                        }
                      </ol>
                    </li>
                  ))
                }
              </ol>
            </li>
          ))
        }
      </ol>
      <button onClick={fetchMoreRecords}>Load More</button>
    </section>
  )
};

export default FoodJournal;