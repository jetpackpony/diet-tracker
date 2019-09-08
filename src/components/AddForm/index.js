import React from 'react';
import AddForm from './AddForm';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ADD_RECORD, ADD_RECORD_WITH_FOOD_ITEM, SEARCH_FOOD_ITEMS } from '../../queries';

const AddFormContainer = () => {
  const [addRecordWithFoodItemMutation] = useMutation(ADD_RECORD_WITH_FOOD_ITEM);
  const addRecordWithFoodItem = (rec) => {
    addRecordWithFoodItemMutation({ variables: { ...rec } });
  };

  const [addRecordMutation] = useMutation(ADD_RECORD);
  const addRecord = (rec) => {
    addRecordMutation({ variables: { ...rec } });
  };

  const [
    search,
    {
      loading: isSearching,
      data: searchData
    }
  ] = useLazyQuery(SEARCH_FOOD_ITEMS);
  const searchFoodItem = (filter) => {
    console.log("Searching for: ", filter);
    search({ variables: { filter } });
  };

  return (
    <AddForm
      addRecordWithFoodItem={addRecordWithFoodItem}
      addRecord={addRecord}
      isSearching={isSearching}
      foundFoodItems={searchData && searchData.filterFoodItems}
      searchFoodItem={searchFoodItem}
    />
  );
};

export default AddFormContainer;