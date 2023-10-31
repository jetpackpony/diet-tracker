import AddForm from "./AddForm";
import { useAddRecordWithFoodItem } from "../../hooks/useAddRecordWithFoodItem";
import { useAddRecord } from "../../hooks/useAddRecord";
import { useSearchFoodItem } from "../../hooks/useSearchFoodItem";

export const MIN_LENGTH_TO_SEARCH = 2;

const AddFormContainer = () => {
  const addRecordWithFoodItem = useAddRecordWithFoodItem();
  const addRecord = useAddRecord();
  const { searchFoodItem, isSearching, searchData } = useSearchFoodItem();

  return (
    <AddForm
      addRecordWithFoodItem={addRecordWithFoodItem}
      addRecord={addRecord}
      isSearching={isSearching}
      foundFoodItems={searchData?.filterFoodItems}
      searchFoodItem={searchFoodItem}
    />
  );
};

export default AddFormContainer;
