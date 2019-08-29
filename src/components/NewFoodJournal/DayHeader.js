import React, { useState } from 'react';
import foodJournalStyles from './FoodJournal.module.css';
import selfStyles from './DayHeader.module.css';

const DayHeader = () => {
  const [unfolded, setUnfolded] = useState(false);
  return (
    <header className={[
      unfolded ? foodJournalStyles.unfolded : "",
      foodJournalStyles.lineGrid,
      selfStyles.dayHeader
    ].join(" ")}>
      <h3 className={foodJournalStyles.title}>28 Aug</h3>
      <button
        className={foodJournalStyles.unfold}
        onClick={() => setUnfolded(!unfolded)}
      >
        {
          unfolded
            ? "fold"
            : "unfold"
        }
      </button>
      <div className={foodJournalStyles.statItem}>2348 left</div>
      <div className={foodJournalStyles.statItem}>3478 ccal</div>
      <div className={foodJournalStyles.statItem}>176.9 / 123.4 / 666.6</div>
    </header>
  )
};

export default DayHeader;