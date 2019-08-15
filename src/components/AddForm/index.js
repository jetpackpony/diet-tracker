import React from 'react';
import AddForm from './AddForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_RECORD = gql`
  mutation AddRecordWithFoodItem(
    $title: String!
    $calories: Float!
    $protein: Float!
    $fat: Float!
    $carbs: Float!
    $weight: Int!
    $eatenAt: DateTime!
    $createdAt: DateTime!
  ) {
    addRecordWithFoodItem(
      title: $title
      calories: $calories
      protein: $protein
      fat: $fat
      carbs: $carbs
      weight: $weight
      eatenAt: $eatenAt
      createdAt: $createdAt
    ) {
      id
    }
  }
`;

const AddFormContainer = () => {
  const [mutate, { data }] = useMutation(ADD_RECORD);
  const addRecord = (rec) => {
    mutate({ variables: { ...rec } });
  };

  return <AddForm addRecord={addRecord} />;
};

export default AddFormContainer;