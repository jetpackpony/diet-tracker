import React, { useMemo, useState } from 'react';
import "./reset.css";
import "./App.css";
import styles from './App.module.css';
import Login from './components/Login';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AppBar from './components/AppBar';
import SelectionContext from './SelectionContext';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const selectionContextValue = useMemo(() => ({
    selectedRecords,
    toggleSelection: (id) => {
      console.log("Toggling", id);
      if (selectedRecords.includes(id)) {
        setSelectedRecords(selectedRecords.filter((rec) => rec !== id));
      } else {
        setSelectedRecords([...selectedRecords, id])
      }
    },
    clearSelection: () => setSelectedRecords([])
  }), [selectedRecords, setSelectedRecords]);
  return (
    <SelectionContext.Provider value={selectionContextValue}>
      <main className={styles.main}>
        {
          data && data.isLoggedIn
            ? (
              <>
                <AddForm />
                <FoodJournal />
              </>
            )
            : <Login />
        }
      </main>
    </SelectionContext.Provider>
  );
};

export default App;
