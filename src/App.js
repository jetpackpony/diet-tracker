import React, { useMemo, useState } from 'react';
import "./reset.css";
import "./App.css";
import styles from './App.module.css';
import Login from './components/Login';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AppBar from './components/AppBar';
import AddForm, { insertRecordIntoCache } from './components/AddForm';
import FoodJournal, { updateTotals } from './components/FoodJournal';
import SelectionContext from './SelectionContext';
import { GET_WEEKLY_FEED, DELETE_RECORD, ADD_RECORD } from './queries';
import moment from 'moment';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const deleteRecord = (weeks, recId) => {
  const res = weeks.map((week) => {
    return {
      ...week,
      days: week.days.map((day) => {
        return {
          ...day,
          records: day.records.filter((rec) => rec.id !== recId)
        };
      })
    };
  });
  return res;
};

const removeRecordFromCache = (cache, { data: { deleteRecord: recId } }) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: GET_WEEKLY_FEED, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(deleteRecord(weeklyRecordsFeed.weeks, recId))
    }
  };
  cache.writeQuery({
    query: GET_WEEKLY_FEED,
    variables: { cursor: "" },
    data: newData
  });
};

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
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

  const [deleteRecordMut] = useMutation(DELETE_RECORD);
  const [addRecordMut] = useMutation(ADD_RECORD);

  const deleteRecords = (items) => {
    items.map(({ id }) => {
      deleteRecordMut({
        variables: { id },
        update: removeRecordFromCache
      });
    });
  };
  const cloneRecords = (items) => {
    items.map(({ foodItemID }) => {
      addRecordMut({
        variables: {
          foodItemID,
          weight: 0,
          eatenAt: moment().toISOString(),
          createdAt: moment().toISOString()
        },
        update: (cache, { data: { addRecord: newRecord } }) => {
          insertRecordIntoCache(cache, newRecord);
        }
      });
    })
  };

  return (
    <SelectionContext.Provider value={selectionContextValue}>
      <AppBar
        selectedRecords={selectedRecords}
        deleteRecords={deleteRecords}
        cloneRecords={cloneRecords}
      />
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
