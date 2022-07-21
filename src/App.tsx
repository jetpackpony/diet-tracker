import React, { useMemo, useState } from 'react';
import "./reset.css";
import "./App.css";
import styles from './App.module.css';
import Login from './components/Login';
import { useQuery, useMutation, InMemoryCache } from '@apollo/client';
import AppBar from './components/AppBar';
import AddForm, { insertRecordIntoCache } from './components/AddForm';
import FoodJournal, { updateTotals } from './components/FoodJournal';
import SelectionContext, { useSelection } from './SelectionContext';
import moment from 'moment';
import {
  AddRecordDocument, DeleteRecordDocument,
  IsLoggedInDocument, WeeklyRecordsFeedDocument
} from './generated/graphql';

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

const removeRecordFromCache = (cache: InMemoryCache, { data: { deleteRecord: recId } }) => {
  const { weeklyRecordsFeed } = cache.readQuery({ query: WeeklyRecordsFeedDocument, variables: { cursor: "" } });

  const newData = {
    weeklyRecordsFeed: {
      ...weeklyRecordsFeed,
      weeks: updateTotals(deleteRecord(weeklyRecordsFeed.weeks, recId))
    }
  };
  cache.writeQuery({
    query: WeeklyRecordsFeedDocument,
    variables: { cursor: "" },
    data: newData
  });
};

const App = () => {
  const { data } = useQuery(IsLoggedInDocument);
  const selectionContextValue = useSelection();

  const [deleteRecordMut] = useMutation(DeleteRecordDocument);
  const [addRecordMut] = useMutation(AddRecordDocument);

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
