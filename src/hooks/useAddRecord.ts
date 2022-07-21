import { useMutation } from "@apollo/client";
import { AddRecordDocument } from "../generated/graphql";
import { insertRecordIntoCache } from "../utils/cacheOperations";

export const useAddRecord = () => {
  const [addRecordMutation] = useMutation(AddRecordDocument);
  return (rec) => {
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