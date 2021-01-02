import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import generateLetters from './util/GenerateLetters';

import { GET_EMPLOYEES } from './graphql/query/employee';

const EmployeesContainer = () => (
  <Query query={GET_EMPLOYEES}>
    {({loading, data}) => {
      if (loading) return 'Loading';
      return <Employees employees={data.getEmployees} />;
    }}
  </Query>
);

const Employees = (props) => {
  const employees = props.employees;
  const letters = generateLetters(employees.map((x) => x.LastName));

  const indexedEmployees = letters.map((l) => {

    const es = employees.filter((e) => e.LastName.startsWith(l)).map((e) =>
      <div key={e.EmployeeId}>
        <Link to={`/employee/${e.EmployeeId}`}>{e.LastName}, {e.FirstName} ({e.Title})</Link>
      </div>
    );

    return (
      <div key={l}>
        <h2 id={`letter-${l}`}>{l}</h2>
        {es}
      </div>);
  });

  return(
    <div key="employees">
      <h1>Employees</h1>
      {indexedEmployees}
    </div>
  );
}

export default EmployeesContainer;


