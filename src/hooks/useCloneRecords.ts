import { useMutation } from '@apollo/client';
import type { SelectionItem } from '../SelectionContext';
import moment from 'moment';
import { AddRecordDocument } from '../generated/graphql';
import { insertRecordIntoCache } from '../utils/cacheOperations';

export const useCloneRecords = () => {
  const [addRecordMut] = useMutation(AddRecordDocument);
  return (items: SelectionItem[]) => {
    items.map(({ foodItemID }) => {
      addRecordMut({
        variables: {
          foodItemID,
          weight: 0,
          eatenAt: moment().toISOString(),
          createdAt: moment().toISOString()
        },
        update: (cache, result) => {
          if (result.data?.addRecord) {
            insertRecordIntoCache(cache, result.data.addRecord);
          }
        }
      });
    })
  };
};
