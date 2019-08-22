import React from 'react';
import AddForm from './AddForm';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
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

const SEARCH_FOOD_ITEMS = gql`
  query SearchFoodItems($filter: String!) {
    filterFoodItems(filter: $filter, limit: 5) {
      foodItemID: id
      title
      calories
      protein
      fat
      carbs
    }
  }
`;

const AddFormContainer = () => {
  const [mutate] = useMutation(ADD_RECORD);
  const [
    search,
    {
      loading: isSearching,
      data: searchData
    }
  ] = useLazyQuery(SEARCH_FOOD_ITEMS);

  const addRecord = (rec) => {
    mutate({ variables: { ...rec } });
  };

  const searchFoodItem = (filter) => {
    console.log("Searching for: ", filter);
    search({ variables: { filter } });
  };

  return (
    <AddForm
      addRecord={addRecord}
      isSearching={isSearching}
      foundFoodItems={searchData && searchData.filterFoodItems}
      searchFoodItem={searchFoodItem}
    />
  );
};

export default AddFormContainer;