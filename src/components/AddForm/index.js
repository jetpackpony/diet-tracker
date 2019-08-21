import React, { useState } from 'react';
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
  const [foundFoodItems, setFoundFoodItems] = useState([
    {
      "foodItemID": "1111",
      "title": "Food 1",
      "calories": 11,
      "protein": 11,
      "fat": 11,
      "carbs": 11
    }, {
      "foodItemID": "2222",
      "title": "Food 2",
      "calories": 22,
      "protein": 22,
      "fat": 22,
      "carbs": 22
    }
  ]);
  const [isSearching, setIsSearching] = useState(false);

  const addRecord = (rec) => {
    mutate({ variables: { ...rec } });
  };

  const searchFoodItem = (searchStr) => {
    console.log("Searching for: ", searchStr);
  };

  return (
    <AddForm
      addRecord={addRecord}
      isSearching={isSearching}
      foundFoodItems={foundFoodItems}
      searchFoodItem={searchFoodItem}
    />
  );
};

export default AddFormContainer;