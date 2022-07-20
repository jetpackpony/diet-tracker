import React, { useEffect, useRef, useContext } from 'react';
import styles from './RecordLine.module.css';
import EditField from './EditField';
import SelectionContext from '../../../SelectionContext';

const RecordLine = ({
  id,
  foodItem: {
    id: foodItemID,
    title
  },
  weight,
  calories,
  protein,
  fat,
  carbs,
  updateRecord
}) => {
  const { selectedRecords, toggleSelection } = useContext(SelectionContext);
  const timer = useRef(null);
  const clickStart = useRef(false);
  useEffect(() => {
    const clear = () => timer.current && clearTimeout(timer.current);
    window.addEventListener('scroll', clear);
    window.addEventListener('blur', clear);
    return (() => {
      window.removeEventListener('scroll', clear)
      window.removeEventListener('blur', clear)
    });
  });

  const clickCancel = () => {
    clickStart.current = false;
    timer.current && clearTimeout(timer.current);
  };

  const onPointerDown = () => {
    if (!clickStart.current) {
      clickStart.current = true;
      timer.current = setTimeout(() => {
        if (clickStart.current) {
          toggleSelection({ id, foodItemID });
          clickCancel();
        }
      }, 500);
    }
  };

  const onPointerUp = () => {
    // If there are items already selected, select following items on click
    if (clickStart.current && selectedRecords.length > 0) {
      toggleSelection({ id, foodItemID });
    }
    clickCancel();
  };

  const onPointerLeave = () => {
    clickCancel();
  };

  const onPoinerCancel = () => {
    clickCancel();
  };

  const classes = [styles.recordLine];
  if (weight <= 0) {
    classes.push(styles["not-filled-in"]);
  }
  if (selectedRecords.find((rec) => rec.id === id)) {
    classes.push(styles["selected"]);
  }

  return (
    <li
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPoinerCancel}
      className={classes.join(" ")}
    >
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>
          {calories} cal {protein} / {fat} / {carbs}
        </div>
      </div>
      <div className={styles.right}>
        <EditField
          weight={weight}
          onUpdate={({ weight }) => {
            updateRecord({ id, weight });
          }}
        />
      </div>
    </li>
  )
};

export default RecordLine;