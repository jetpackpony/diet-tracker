import React from 'react';
import styles from './WeekHeader.module.css';

const WeekHeader = () => {
  console.log(styles);
  return (
    <header className={styles.weekHeader}>
      <h2>Week 26 Aug - 26 Sep</h2>
      <div>3456 left</div>
    </header>
  )
};

export default WeekHeader;