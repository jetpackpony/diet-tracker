import React, { useState } from 'react';
import foodJournalStyles from './FoodJournal.module.css';
import selfStyles from './RecordLine.module.css';

const RecordLine = () => {
  const [unfolded, setUnfolded] = useState(false);
  return (
    <li className={[
      unfolded ? foodJournalStyles.unfolded : "",
      foodJournalStyles.lineGrid,
      selfStyles.line
    ].join(" ")}>
      <div className={foodJournalStyles.title}>Cinnamon Rolls</div>
      <button
        className={foodJournalStyles.unfold}
        onClick={() => { console.log("clicked"); setUnfolded(!unfolded);}}
      >
        {
          unfolded
            ? "fold"
            : "unfold"
        }
      </button>
      <div className={foodJournalStyles.statItem}>181 g.</div>
      <div className={foodJournalStyles.statItem}>144 ccal</div>
      <div className={foodJournalStyles.statItem}>176.9 / 123.4 / 666.6</div>
    </li>
  )
};

export default RecordLine;