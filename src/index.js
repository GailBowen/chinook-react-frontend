import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';

import App  from './App';
import AlbumsContainer from './AlbumsContainer';
import ArtistsContainer from './ArtistsContainer';
import CustomersContainer from './CustomersContainer';
import EmployeesContainer from './EmployeesContainer';

import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
  fetchOptions: {
    mode: 'no-cors',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/albums">
            <AlbumsContainer />
          </Route>
          <Route path="/artists">
            <ArtistsContainer />
          </Route>
          <Route path="/customers">
            <CustomersContainer />
          </Route>
          <Route path="/employees">
            <EmployeesContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
