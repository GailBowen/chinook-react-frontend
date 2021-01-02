import { gql } from 'apollo-boost';

export const EMPLOYEE_FRAGMENT = gql`
  fragment EmployeeFragment on Employee {
    EmployeeId
    FirstName
    LastName
  }
`;

export const GET_EMPLOYEES = gql`
{
  getEmployees{
    ...EmployeeFragment
    Title
  }
}
${EMPLOYEE_FRAGMENT}
`;


