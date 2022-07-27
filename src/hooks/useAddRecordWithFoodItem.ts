import { useMutation } from "@apollo/client";
import { AddRecordWithFoodItemDocument, AddRecordWithFoodItemMutationVariables } from "../generated/graphql";
import { insertRecordIntoCache } from "../utils/cacheOperations";

export const useAddRecordWithFoodItem = () => {
  const [addRecordWithFoodItemMutation] = useMutation(AddRecordWithFoodItemDocument);
  return (rec: AddRecordWithFoodItemMutationVariables) => {
    addRecordWithFoodItemMutation({
      variables: { ...rec },
      update: (cache, result) => {
        if (result.data?.addRecordWithFoodItem) {
          insertRecordIntoCache(cache, result.data.addRecordWithFoodItem);
        }
      }
    });
  };
};