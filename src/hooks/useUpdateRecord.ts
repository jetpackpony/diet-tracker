import { useMutation } from "@apollo/client";
import {
  UpdateRecordDocument,
  UpdateRecordMutationVariables,
} from "../generated/graphql";
import { updateCachedTotals } from "../utils/cacheOperations";

export type UpdateRecord = ({
  id,
  weight,
}: UpdateRecordMutationVariables) => void;

export const useUpdateRecord = (): UpdateRecord => {
  const [updateRecordMut] = useMutation(UpdateRecordDocument);
  return ({ id, weight }: UpdateRecordMutationVariables) => {
    console.log("Updating record: ", { id, weight });
    updateRecordMut({
      variables: { id, weight },
      update: updateCachedTotals,
    });
  };
};
