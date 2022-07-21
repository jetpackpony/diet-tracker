import { useMutation } from "@apollo/client";
import { UpdateRecordDocument } from "../generated/graphql";
import { updateCachedTotals } from "../utils/cacheOperations";

export const useUpdateRecord = () => {
  const [updateRecordMut] = useMutation(UpdateRecordDocument);
  return ({ id, weight }) => {
    console.log("Updating record: ", { id, weight });
    updateRecordMut({
      variables: { id, weight },
      update: updateCachedTotals
    });
  };
};