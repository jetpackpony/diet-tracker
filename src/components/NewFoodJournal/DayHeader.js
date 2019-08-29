import React from 'react';
import styles from './DayHeader.module.css';
import useFoldableGrid from './useFoldableGrid';

const DayHeader = () => {
  const {
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  return (
    <header className={[ containerClass, styles.dayHeader ].join(" ")}>
      <h3 className={titleClass}>28 Aug</h3>
      {unfoldButton}
      <div className={statItemClass}>2348 left</div>
      <div className={statItemClass}>3478 ccal</div>
      <div className={statItemClass}>176.9 / 123.4 / 666.6</div>
    </header>
  )
};

export default DayHeader;