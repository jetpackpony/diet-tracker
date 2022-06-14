import React from 'react';
import "./reset.css";
import "./App.css";
import styles from './App.module.css';
import Login from './components/Login';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AppBar from './components/AppBar';
import AddForm from './components/AddForm';
import FoodJournal from './components/FoodJournal';


const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <>
      <AppBar />
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
    </>
  );
};

export default App;
