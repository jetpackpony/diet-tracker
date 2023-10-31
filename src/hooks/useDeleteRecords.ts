import { useMutation } from "@apollo/client";
import type { SelectionItem } from "../SelectionContext";
import { DeleteRecordDocument } from "../generated/graphql";
import { removeRecordFromCache } from "../utils/cacheOperations";

export const useDeleteRecords = () => {
  const [deleteRecordMut] = useMutation(DeleteRecordDocument);
  return (items: SelectionItem[]) => {
    items.map(({ id }) => {
      deleteRecordMut({
        variables: { id },
        update: (cache, result) => {
          if (result.data?.deleteRecord) {
            removeRecordFromCache(cache, result.data.deleteRecord);
          }
        },
      });
    });
  };
};
