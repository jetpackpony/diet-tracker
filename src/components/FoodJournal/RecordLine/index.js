import React, { useState } from 'react';
import styles from './RecordLine.module.css';
import useFoldableGrid from '../useFoldableGrid';
import { Trash, Edit } from 'grommet-icons';
import Button from '../../Button';
import EditField from './EditField';

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
  updateRecord,
  deleteRecord
}) => {
  const {
    toggleFold,
    unfoldButton,
    containerClass,
    titleClass,
    statItemClass
  } = useFoldableGrid();
  const [editing, setEditing] = useState(false);
  return (
    <li
      className={[containerClass, styles.recordLine].join(" ")}
      onClick={toggleFold}
    >
      <div className={titleClass}>{title}</div>
      {unfoldButton}
      <div className={statItemClass} onClick={(e) => e.stopPropagation()}>
        {
          editing
            ? (
              <EditField
                weight={weight}
                onUpdate={({ weight }) => {
                  setEditing(false);
                  updateRecord({ id, weight });
                }}
              />
            )
            : (
              <>
                {weight} g.
                <Button
                  className={[styles.actionButton, styles.edit].join(" ")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                  }}
                >
                  <Edit size="small" color="blue" />
                  <span> Edit</span>
                </Button>
              </>
            )
        }
      </div>
      <div className={statItemClass}>{calories} ccal</div>
      <div className={statItemClass}>{protein} / {fat} / {carbs}</div>
      <Button
        className={[statItemClass, styles.actionButton].join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          deleteRecord(id);
        }}
      >
        <Trash size="small" color="red" />
        <span> Delete</span>
      </Button>
    </li>
  )
};

export default RecordLine;