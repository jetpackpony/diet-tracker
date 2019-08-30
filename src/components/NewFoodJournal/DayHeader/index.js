import React from 'react';
import styles from './DayHeader.module.css';
import useFoldableGrid from '../useFoldableGrid';
import moment from 'moment';

const getDateString = (isoString) => moment(isoString).format("D MMMM");

const DayHeader = ({
  dayStart,
  totals: {
    calories,
    protein,
    fat,
    carbs,
  },
  calDeficit
}) => {
  const {
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  return (
    <header className={[ containerClass, styles.dayHeader ].join(" ")}>
      <h3 className={titleClass}>{getDateString(dayStart)}</h3>
      {unfoldButton}
      <div className={statItemClass}>{calDeficit} left</div>
      <div className={statItemClass}>{calories} ccal</div>
      <div className={statItemClass}>{protein} / {fat} / {carbs}</div>
    </header>
  )
};

export default DayHeader;