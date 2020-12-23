import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

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
  const customers = props.customers.map((l,i) => {
    return (
      <li key={i}>
        <Link to={`/customer/${l.CustomerId}`}>{l.FirstName} {l.LastName}</Link>
      </li>
    )});

  return(
    <>
    <ul>
      {customers}
    </ul>
    </>
  );
}

export default CustomersContainer;

