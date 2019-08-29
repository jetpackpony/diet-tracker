import React from 'react';
import styles from './RecordLine.module.css';
import useFoldableGrid from './useFoldableGrid';

const RecordLine = () => {
  const {
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  return (
    <li className={[ containerClass, styles.recordLine ].join(" ")}>
      <div className={titleClass}>Cinnamon Rolls</div>
      {unfoldButton}
      <div className={statItemClass}>181 g.</div>
      <div className={statItemClass}>144 ccal</div>
      <div className={statItemClass}>176.9 / 123.4 / 666.6</div>
    </li>
  )
};

export default RecordLine;