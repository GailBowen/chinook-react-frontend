import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import KeyValue from './KeyValue';

const QUERY = gql`
  query getEmployee($employeeId: Int!) {
    getEmployee(employeeId: $employeeId) {
      LastName
      FirstName
      Title
      ReportsTo
      ReportsToFirstName
      ReportsToLastName
      BirthDate
      HireDate
      Address
      City
      State
      Country
      PostalCode
      Phone
      Fax
      Email
    }
  }
`;

const EmployeeContainer = () => {
  let { employeeId } = useParams();
  employeeId = parseInt(employeeId);

  let { loading, error, data } = useQuery(QUERY, {
    variables: { employeeId }
  });

  if (error) {
    throw(error);
  }

  if (loading) {
    return "Loading";
  }

  const employee = data.getEmployee;

  return (
    <Employee employee={employee} />
  );

};

const Employee = (props) => {
  const e = props.employee;
  const reportsTo = <Link to={`/employee/${e.ReportsTo}`}>{e.ReportsToFirstName} {e.ReportsToLastName}</Link>
  return (
    <>
    <h1>Employee {e.FirstName} {e.LastName}</h1>
    <KeyValue label="Job Title" value={e.Title} />
    <KeyValue label="Reports To" value={reportsTo} />
    <KeyValue label="Date of Birth" value={e.BirthDate} />
    <KeyValue label="Date hired" value={e.HireDate} />
    <br />
    <KeyValue label="Address" value={e.Address} />
    <KeyValue label="City" value={e.City} />
    <KeyValue label="State" value={e.State} />
    <KeyValue label="PostalCode" value={e.PostalCode} />
    <KeyValue label="Country" value={e.Country} />
    <KeyValue label="Phone" value={e.Phone} />
    <KeyValue label="Fax" value={e.Fax} />
    <KeyValue label="Email" value={e.Email} />
    </>
  );
}

export default EmployeeContainer;
