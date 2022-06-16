import React from 'react';

const SelectionContext = React.createContext({
  selectedIDs: [],
  toggleSelection: () => { }
});

export default SelectionContext;