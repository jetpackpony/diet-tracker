import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getStorageItem } from './storage';

const apiAddress =
  (process.env.REACT_APP_API_ADDRESS)
    ? process.env.REACT_APP_API_ADDRESS
    : `http://${window.location.hostname}:4000/`;

const httpLink = createHttpLink({
  uri: apiAddress,
});

const authLink = setContext((_, { headers }) => {
  const token = getStorageItem("auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return !!getStorageItem("auth-token");
            }
          }
        }
      }
    }
  }),
  request: async (operation) => {
    const token = getStorageItem("auth-token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const root = createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
