import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { getStorageItem } from './storage';

const apiAddress = 
  (process.env.REACT_APP_API_ADDRESS)
    ? process.env.REACT_APP_API_ADDRESS
    : `http://${window.location.hostname}:4000/`;

const client = new ApolloClient({
  uri: apiAddress,
  request: async (operation) => {
    const token = getStorageItem("auth-token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!getStorageItem("auth-token")
    },
    typeDefs: `
      type Query {
        isLoggedIn: Boolean
      }
    `,
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
