import React, { useState } from 'react';
import styles from './FoodJournal.module.css';
import { useUncontrolledFormHook } from '../../hooks/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DayItem = ({
  id,
  foodItem: {
    title,
    calories,
    protein,
    fat,
    carbs
  },
  weight,
  updateWeight,
  deleteRecord
}) => {
  const [editing, setEditing] = useState(false);
  const submitForm = (values, event) => {
    setEditing(false);
    event.target.reset();
    updateWeight({ id, weight: values.weight });
  }
  const { onSubmit, initForm } = useUncontrolledFormHook(submitForm);

  return (
    <li className={styles.row}>
      <span onClick={() => deleteRecord(id)}>X</span>
      <span>{title}</span>
      <span>
        {
          editing
            ? (
              <form onSubmit={onSubmit} ref={initForm}>
                <input type="number" id="edit" name="weight" defaultValue={weight} />
              </form>
            )
            : (<span onClick={() => setEditing(!editing)}>{weight}</span>)
        }
        g
      </span>
      <span>{calories * weight * 0.01}</span>
      <span>{protein * weight * 0.01}</span>
      <span>{fat * weight * 0.01}</span>
      <span>{carbs * weight * 0.01}</span>
    </li>
  );
};

const UPDATE_RECORD = gql`
  mutation UpdateRecord(
    $id: ID!
    $weight: Int!
  ) {
    updateRecord(
      id: $id
      weight: $weight
    ) {
      id
      weight
    }
  }
`;
const DELETE_RECORD = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(id: $id)
  }
`;

const DayItemContainer = ({...props}) => {
  const [ updateRecord ] = useMutation(UPDATE_RECORD);
  const [ deleteRecord ] = useMutation(DELETE_RECORD);
  const updateWeight = ({ id, weight }) => {
    console.log("Updating record: ", {id, weight});
    updateRecord({ variables: { id, weight }});
  };

  const deleteRecordWrapper = (id) => {
    console.log("Deleting record: ", id);
    deleteRecord({ variables: { id }});
  };

  return <DayItem
    {...props}
    updateWeight={updateWeight}
    deleteRecord={deleteRecordWrapper}
  />;
};

export default DayItemContainer;