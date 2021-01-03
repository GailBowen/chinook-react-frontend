import React from 'react';
import { useQuery } from 'react-apollo';
import { Link, useHistory } from 'react-router-dom';

import { GET_CUSTOMERS } from './graphql/query/customer';

import AddButton from './components/AddButton';

import generateLetters from './util/GenerateLetters';

const CustomersContainer = () => {

  const { loading, error, data } = useQuery(GET_CUSTOMERS, {
      fetchPolicy: "cache-and-network",
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return "Loading"
  }
  
  return <Customers customers={data.getCustomers} />;
};

const Customers = (props) => {
  const customers = props.customers;

  const letters = generateLetters(customers.map((x) => x.LastName));

  const history = useHistory();

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

  const handleAdd = () => {
    history.push('/addcustomer');
  };

  return(
    <div key="customers">
      <h1>Customers</h1>
      <AddButton caption="Add Customer" handleClick={handleAdd} />
      {indexedCustomers}
    </div>
  );
}

export default CustomersContainer;

