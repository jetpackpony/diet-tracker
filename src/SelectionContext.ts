import { useMemo, useState, createContext } from "react";

export interface SelectionItem {
  id: string;
  foodItemID: string;
}

export interface SelectionContextInterface {
  selectedRecords: SelectionItem[];
  toggleSelection: (item: SelectionItem) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextInterface>({
  selectedRecords: [],
  toggleSelection: () => {},
  clearSelection: () => {},
});

export default SelectionContext;

export const useSelection = (): SelectionContextInterface => {
  const [selectedRecords, setSelectedRecords] = useState<SelectionItem[]>([]);
  const selectionContextValue = useMemo<SelectionContextInterface>(
    () => ({
      selectedRecords,
      toggleSelection: (item) => {
        if (selectedRecords.find((i) => i.id === item.id)) {
          setSelectedRecords(selectedRecords.filter((i) => i.id !== item.id));
        } else {
          setSelectedRecords([...selectedRecords, item]);
        }
      },
      clearSelection: () => setSelectedRecords([]),
    }),
    [selectedRecords, setSelectedRecords],
  );

  return selectionContextValue;
};
