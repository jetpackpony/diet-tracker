import React from 'react';
import styles from './FoodJournal.module.css';

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

const DayList = () => (
  <ul className={styles.list}>
    <DayItem />
    <DayItem />
  </ul >
);

const DayItem = () => (
  <li className={styles.row}>
    <span>Cinnamon Rolls</span>
    <span>230 g</span>
    <span>670</span>
    <span>53</span>
    <span>23</span>
    <span>43</span>
  </li>
);

const DayLog = () => (
  <article className={styles.dayLog}>
    <DayHeader
      date="28 Jul 2019"
      totalCal="3584"
      totalProtein="44"
      totalFat="132"
      totalCarbs="23"
    />
    <DayList/>
  </article>
);

const FoodJournal = () => (
  <section className={styles.container}>
    <DayLog/>
  </section>
);

export default FoodJournal;