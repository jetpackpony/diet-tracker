import { useMemo, useState, createContext } from 'react';

const SelectionContext = createContext({
  selectedIDs: [],
  toggleSelection: () => { }
});

export default SelectionContext;

export const useSelection = () => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const selectionContextValue = useMemo(() => ({
    selectedRecords,
    toggleSelection: (item) => {
      if (selectedRecords.find((i) => i.id === item.id)) {
        setSelectedRecords(selectedRecords.filter((i) => i.id !== item.id));
      } else {
        setSelectedRecords([...selectedRecords, item])
      }
    },
    clearSelection: () => setSelectedRecords([])
  }), [selectedRecords, setSelectedRecords]);

  return selectionContextValue;
};
