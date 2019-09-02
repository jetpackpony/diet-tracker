import React from 'react';
import styles from './RecordLine.module.css';
import useFoldableGrid from '../useFoldableGrid';
import { Trash, Edit } from 'grommet-icons';
import Button from '../../Button';

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
    toggleFold,
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  return (
    <li
      className={[containerClass, styles.recordLine].join(" ")}
      onClick={toggleFold}
    >
      <div className={titleClass}>{title}</div>
      {unfoldButton}
      <div className={statItemClass}>
        {weight} g.
        <Button
          className={[styles.actionButton, styles.edit].join(" ")}
          onClick={(e) => { e.stopPropagation(); console.log("editing"); }}
        >
          <Edit size="small" color="blue" />
          <span> Edit</span>
        </Button>

      </div>
      <div className={statItemClass}>{calories} ccal</div>
      <div className={statItemClass}>{protein} / {fat} / {carbs}</div>
      <Button
        className={[statItemClass, styles.actionButton].join(" ")}
        onClick={(e) => { e.stopPropagation(); console.log("deleting"); }}
      >
        <Trash size="small" color="red" />
        <span> Delete</span>
      </Button>
    </li>
  )
};

export default RecordLine;