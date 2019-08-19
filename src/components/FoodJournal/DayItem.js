import React, { useState } from 'react';
import styles from './FoodJournal.module.css';
import useFormHook from '../../hooks/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DayItem = ({
  id,
  title,
  weight,
  calories,
  protein,
  fat,
  carbs,
  updateWeight
}) => {
  const [editing, setEditing] = useState(false);
  const submitForm = (values, event) => {
    setEditing(false);
    event.target.reset();
    updateWeight({ id, weight: values.weight });
  }
  const { onSubmit, initForm } = useFormHook(submitForm);

  return (
    <li className={styles.row}>
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
      <span>{calories}</span>
      <span>{protein}</span>
      <span>{fat}</span>
      <span>{carbs}</span>
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
    }
  }
`;

const DayItemContainer = ({...props}) => {
  const [
    updateRecord,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_RECORD);
  const updateWeight = ({ id, weight }) => {
    console.log("Updating record: ", {id, weight});
    updateRecord({ variables: { id, weight }});
  };

  return <DayItem {...props} updateWeight={updateWeight} />;
};

export default DayItemContainer;