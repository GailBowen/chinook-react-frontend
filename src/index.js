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
import Links from './components/Links';

import AlbumsContainer from './AlbumsContainer';
import AlbumContainer from './AlbumContainer';
import ArtistsContainer from './ArtistsContainer';
import ArtistContainer from './ArtistContainer';
import CustomersContainer from './CustomersContainer';
import CustomerContainer from './CustomerContainer';
import EmployeesContainer from './EmployeesContainer';
import EmployeeContainer from './EmployeeContainer';
import GenresContainer from './GenresContainer';
import GenreContainer from './GenreContainer';
import InvoiceContainer from './InvoiceContainer';
import MediaTypesContainer from './MediaTypesContainer';
import PlaylistsContainer from './PlaylistsContainer';
import TracksContainer from './TracksContainer';
import TrackContainer from './TrackContainer';

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
    <Links />
    <div className="page">
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>

          <Route path="/albums">
            <AlbumsContainer />
          </Route>
          <Route path={"/album/:albumId"}>
            <AlbumContainer />
          </Route>
          <Route path="/addalbum">
            <AlbumContainer />
          </Route>

          <Route path="/artists">
            <ArtistsContainer />
          </Route>
          <Route path={"/artist/:artistId"}>
            <ArtistContainer />
          </Route>
          <Route path="/addartist">
            <ArtistContainer />
          </Route>

          <Route path="/customers">
            <CustomersContainer />
          </Route>
          <Route path={"/customer/:customerId"}>
            <CustomerContainer />
          </Route>
          <Route path={"/invoice/:invoiceId"}>
            <InvoiceContainer />
          </Route>
            
          <Route path="/employees">
            <EmployeesContainer />
          </Route>
          <Route path={"/employee/:employeeId"}>
            <EmployeeContainer />
          </Route>

          <Route path="/genres">
            <GenresContainer key={Date.now().toString()} />
          </Route>
          <Route path={"/addgenre"}>
            <GenreContainer key={Date.now().toString()} />
          </Route>
          <Route path={"/genre/:genreId"}>
            <GenreContainer />
          </Route>

          <Route path="/mediatypes">
            <MediaTypesContainer />
          </Route>
          <Route path="/playlists">
            <PlaylistsContainer />
          </Route>
          <Route path="/tracks">
            <TracksContainer />
          </Route>
          <Route path={"/track/:trackId"}>
            <TrackContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
