import { useMutation } from "@apollo/client";
import { AddRecordDocument, AddRecordMutationVariables } from "../generated/graphql";
import { insertRecordIntoCache } from "../utils/cacheOperations";

export const useAddRecord = () => {
  const [addRecordMutation] = useMutation(AddRecordDocument);
  return (rec: AddRecordMutationVariables) => {
    addRecordMutation({
      variables: { ...rec },
      update: (cache, result) => {
        if (result.data?.addRecord) {
          insertRecordIntoCache(cache, result.data.addRecord);
        }
      }
    });
  };
};