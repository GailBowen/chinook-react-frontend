import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_EMPLOYEES = gql`
{
  getEmployees{
    EmployeeId
    Title
    FirstName
    LastName
  }
}
`;

const EmployeesContainer = () => (
  <Query query={GET_EMPLOYEES}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Employees employees={data.getEmployees} />;
    }}
  </Query>
);

const Employees = (props) => {
  const employees = props.employees.map((l,i) => <li key={i}>{l.Title} {l.FirstName} {l.LastName}</li>);

  return(
    <>
    <ul>
      {employees}
    </ul>
    </>
  );
}

export default EmployeesContainer;


