import React, { useState } from 'react';
import styles from './FoodJournal.module.css';
import RecordLine from './RecordLine';
import DayHeader from './DayHeader';

const FoodJournal = () => {
  const [unfolded, setUnfolded] = useState(false);
  console.log(styles);
  return (
    <section className={styles.foodJournal}>
      <ol>
        <li className={styles.week}>
          <h2>Week 26 Aug - 1 Sep</h2>
          <ol>
            <li className={styles.day}>
              <DayHeader />
              <ol className={styles.recordList}>
                <RecordLine />
                <RecordLine />
                <RecordLine />
                <RecordLine />
              </ol>
            </li>
            <li className={styles.day}>
              <header>
                <h3>27 Aug</h3>
                <button>unfold</button>
                <div>2348 left</div>
                <div>3478 ccal</div>
                <div>176.9 / 123.4 / 666.6</div>
              </header>
              <ol>
                <RecordLine />
                <RecordLine />
                <RecordLine />
                <RecordLine />
              </ol>
            </li>
          </ol>
        </li>
        <li className={styles.week}>
          <h2>Week 19 Aug - 26 Aug</h2>
          <ol>
            <li className={styles.day}>
              <header>
                <h3>21 Aug</h3>
                <button>unfold</button>
                <div>2348 left</div>
                <div>3478 ccal</div>
                <div>176.9 / 123.4 / 666.6</div>
              </header>
              <ol>
                <RecordLine />
                <RecordLine />
                <RecordLine />
                <RecordLine />
              </ol>
            </li>
            <li className={styles.day}>
              <header>
                <h3>20 Aug</h3>
                <button>unfold</button>
                <div>2348 left</div>
                <div>3478 ccal</div>
                <div>176.9 / 123.4 / 666.6</div>
              </header>
              <ol>
                <RecordLine />
                <RecordLine />
                <RecordLine />
                <RecordLine />
              </ol>
            </li>
          </ol>
        </li>
      </ol>
      <button>Load More</button>
    </section>
  )
};

export default FoodJournal;