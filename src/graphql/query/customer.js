import { gql } from 'apollo-boost';

export const GET_CUSTOMERS = gql`
{
  getCustomers{
    CustomerId
    FirstName
    LastName
  }
}
`;

export const GET_CUSTOMER = gql`
  query getCustomer($customerId: Int!) {
    getCustomer(customerId: $customerId) {
      CustomerId
      FirstName
      LastName
      Company
      Address
      City
      State
      Country
      PostalCode
      Phone
      Fax
      Email
      SupportRepId
      SupportRepFirstName
      SupportRepLastName
    }
    getInvoiceByCustomer(customerId: $customerId) {
      InvoiceId
      InvoiceDate
      BillingAddress
      Total
    }
  }
`;

