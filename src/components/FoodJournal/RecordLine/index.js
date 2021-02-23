import React from 'react';
import styles from './RecordLine.module.css';
import EditField from './EditField';
import ContextMenu from './ContextMenu';

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
  deleteRecord,
  cloneRecord
}) => {
  const classes = [styles.recordLine];
  if (weight <= 0) {
    classes.push(styles["not-filled-in"]);
  }

  return (
    <ContextMenu
      items={[
        { title: "Delete", action: () => window.confirm("Delete?") && deleteRecord(id) },
        { title: "Clone", action: () => cloneRecord(foodItemId) },
      ]}
    >
      <li className={classes.join(" ")}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>
            {calories} ccal {protein} / {fat} / {carbs}
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
    </ContextMenu>
  )
};

export default RecordLine;