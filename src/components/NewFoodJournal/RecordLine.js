import React from 'react';
import styles from './RecordLine.module.css';
import useFoldableGrid from './useFoldableGrid';

const RecordLine = ({
  id,
  foodItem: {
    id: foodItemId,
    title
  },
  weight,
  calories,
  protein,
  fat,
  carbs,
}) => {
  const {
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  return (
    <li className={[ containerClass, styles.recordLine ].join(" ")}>
      <div className={titleClass}>{title}</div>
      {unfoldButton}
      <div className={statItemClass}>{weight} g.</div>
      <div className={statItemClass}>{calories} ccal</div>
      <div className={statItemClass}>{protein} / {fat} / {carbs}</div>
    </li>
  )
};

export default RecordLine;