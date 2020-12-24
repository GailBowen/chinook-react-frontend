import React from 'react';
import { Query, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import KeyValue from './KeyValue';

const QUERY = gql`
  query getCustomer($customerId: Int!) {
    getCustomer(customerId: $customerId) {
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

const CustomerContainer = () => {
  let { customerId } = useParams();
  customerId = parseInt(customerId);

  let { loading, error, data } = useQuery(QUERY, {
    variables: { customerId }
  });

  if (loading) {
    return "Loading";
  }

  return ( 
    <>
      <Customer customer={data.getCustomer} invoices={data.getInvoiceByCustomer} />
    </>
  );
};

const Customer = (props) => {
  let customer = props.customer; 
  let invoices = props.invoices;

  let customerName = `${customer.FirstName} ${customer.LastName}`;
  let supportRepLink = <Link to={`/employee/${customer.SupportRepId}`}>{customer.SupportRepFirstName} {customer.SupportRepLastName}</Link>

  return (
    <>
      <h1>Customer</h1>

      <h2>Demographics</h2>
      <KeyValue label="Name" value={customerName} />
      <KeyValue label="Address" value={customer.Address} />
      <KeyValue label="City" value={customer.City} />
      <KeyValue label="State" value={customer.State} />
      <KeyValue label="Postal Code" value={customer.PostalCode} />
      <KeyValue label="Country" value={customer.Country} />
      <KeyValue label="Support Rep" value={supportRepLink} />

      <h2>Invoices</h2>
      <Invoices invoices={invoices} />
    </>
  );
};
 
const Invoices = (props) => {
  const invoices = props.invoices;

  const invoiceLines = invoices.map((l) => {
    return <Invoice key={l.InvoiceId} invoice={l} />;
  });

  return (
    <>
      <table>
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Date</th>
              <th>Billing Address</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceLines}
          </tbody>
      </table>
    </>
  );

};

const Invoice = (props) => {
  const invoice = props.invoice;

  return (
    <>
    <tr>
      <td><Link to={`/invoice/${invoice.InvoiceId}`}>{invoice.InvoiceId}</Link></td>
      <td>{invoice.InvoiceDate}</td>
      <td>{invoice.BillingAddress}</td>
      <td>{invoice.Total}</td>
    </tr>
    </>
  );
}

export default CustomerContainer;
