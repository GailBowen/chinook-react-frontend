import { gql } from 'apollo-boost';

export const UPDATE_CUSTOMER = gql`
  mutation setCustomer($customerId: Int!, $firstName: String!, $lastName: String!, $address: String!,
    $city: String!, $state: String!, $postalCode: String!, $country: String!, $email: String!, 
    $supportRepId: Int!) {

    setCustomer(customerId: $customerId, firstName: $firstName, lastName: $lastName, address: $address,
      city: $city, state: $state, postalCode: $postalCode, country: $country, email: $emaik, 
        supportRepId: $supportRepId) {

        CustomerId
      }
  }
`;

export const INSERT_CUSTOMER = gql`
  mutation addCustomer($firstName: String!, $lastName: String!, $address: String!, $city: String!, 
    $state: String!, $postalCode: String!, $country: String!, $email: String!, $supportRepId: Int!) {

    addCustomer(firstName: $firstName, lastName: $lastName, address: $address, city: $city, 
      state: $state, postalCode: $postalCode, country: $country, email: $email, supportRepId: $supportRepId) {
        CustomerId
      }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customerId: Int!) {
    deleteCustomer(customerId: $customerId)
  }
`;
