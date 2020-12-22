import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
  const customers = props.customers.map((l,i) => <li key={i}>{l.FirstName} {l.LastName}</li>);

  return(
    <>
    <ul>
      {customers}
    </ul>
    </>
  );
}

export default CustomersContainer;

