import React from 'react';
import styles from './FoodJournal.module.css';
import DayItem from './DayItem';

const DayHeader = ({
  date,
  totalCal,
  totalProtein,
  totalFat,
  totalCarbs
}) => (
  <header className={styles.row}>
    <span>{date}</span>
    <span></span>
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
  date,
  totalCal,
  totalProtein,
  totalFat,
  totalCarbs,
  itemList
}) => (
  <article className={styles.dayLog}>
    <DayHeader
      date={date}
      totalCal={totalCal}
      totalProtein={totalProtein}
      totalFat={totalFat}
      totalCarbs={totalCarbs}
    />
    <DayList itemList={itemList} />
  </article>
);

const FoodJournal = ({dates, fetchMoreRecords}) => (
  <>
    <section className={styles.container}>
      {dates.map((data, i) => (
        <DayLog key={i} {...data} />
      ))}
    </section>
    <button onClick={fetchMoreRecords}>Load More</button>
  </>
);

export default FoodJournal;