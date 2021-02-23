import React from 'react';
import FoodJournal from './components/FoodJournal';
import AddForm from './components/AddForm';
import "./reset.css";
import "./App.css";
import Login from './components/Login';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <main>
      {
        data && data.isLoggedIn
          ? (
            <>
              <AddForm />
              <FoodJournal />
            </>
          )
          : (
            <Login />
          )
      }
    </main>
  );
};

export default App;
