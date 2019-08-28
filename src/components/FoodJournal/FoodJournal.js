import React from 'react';
import styles from './FoodJournal.module.css';
import DayItem from './DayItem';

const DayHeader = ({
  date,
  calDeficit,
  totalCal,
  totalProtein,
  totalFat,
  totalCarbs
}) => (
  <header className={styles.row}>
    <span>{date}</span>
    <span></span>
    <span>Deficit: {calDeficit} ccal</span>
    <span>{totalCal} ccal</span>
    <span>{totalProtein} g protein</span>
    <span>{totalFat} g fat</span>
    <span>{totalCarbs} g net carbs</span>
  </header>
);

const DayList = ({ itemList }) => {
  const list = itemList.map((item, i) => (
    <DayItem key={i} {...item} />
  ));
  return (
    <ul className={styles.list}>
      {list}
    </ul >
  );
};

const DayLog = ({
  dayStart: date,
  totals: {
    calories,
    protein,
    fat,
    carbs
  },
  calDeficit,
  records
}) => (
  <article className={styles.dayLog}>
    <DayHeader
      date={date}
      calDeficit={calDeficit}
      totalCal={calories}
      totalProtein={protein}
      totalFat={fat}
      totalCarbs={carbs}
    />
    <DayList itemList={records} />
  </article>
);

const WeekLog = ({
  totals: { calories },
  calDeficit,
  days
}) => (
  <article className={styles.weekLog}>
    <div>Week Total: {calories} ccal</div>
    <div>Week Deficit: {calDeficit} ccal</div>
      {(
        days.map((day, i) => (
          <DayLog key={i} {...day} />
        ))
      )}
  </article>
);

const FoodJournal = ({weeks, fetchMoreRecords}) => (
  <>
    <section className={styles.container}>
      {weeks.map((week, i) => (
        <WeekLog key={i} {...week} />
      ))}
    </section>
    <button onClick={fetchMoreRecords}>Load More</button>
  </>
);

export default FoodJournal;