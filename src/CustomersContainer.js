import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import generateLetters from './util/GenerateLetters';

const GET_CUSTOMERS = gql`
{
  getCustomers{
    CustomerId
    FirstName
    LastName
  }
}
`;

const CustomersContainer = () => (
  <Query query={GET_CUSTOMERS}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Customers customers={data.getCustomers} />;
    }}
  </Query>
);

const Customers = (props) => {
  const customers = props.customers;

  const letters = generateLetters(customers.map((x) => x.LastName));

  const indexedCustomers = letters.map((l) => {

    const letterCustomers = customers.filter((c) => {
      return c.LastName.startsWith(l.toUpperCase()) || c.LastName.startsWith(l.toLowerCase());
    }).map((c) => {
      return (
        <div key={c.CustomerId}>
          <Link to={`/customer/${c.CustomerId}`}>{c.LastName}, {c.FirstName}</Link>
        </div>
      );
    });

    if (letterCustomers.length) {
      return (
        <div key={l}>
          <h2>{l}</h2>
          {letterCustomers}
        </div>
      );
    }

    return null;
  });

  return(
    <div key="customers">
      <h1>Customers</h1>
      {indexedCustomers}
    </div>
  );
}

export default CustomersContainer;

