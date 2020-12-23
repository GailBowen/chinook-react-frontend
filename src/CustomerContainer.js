import React from 'react';
import { Query, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const QUERY = gql`
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
  console.debug(customerId);
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

  return (
    <>
      <h1>Customer</h1>

      <h2>Demographics</h2>
      <Demographic label="Name" value={customerName} />
      <Demographic label="Address" value={customer.Address} />
      <Demographic label="City" value={customer.City} />
      <Demographic label="State" value={customer.State} />
      <Demographic label="Postal Code" value={customer.PostalCode} />
      <Demographic label="Country" value={customer.Country} />
      <Demographic label="Support Rep" value="TODO" />

      <h2>Invoices</h2>
      <Invoices invoices={invoices} />
    </>
  );
};
 
const Demographic = (props) => {
  return (
    <>
      <span className="demographicLabel">{props.label}: </span>
      <span className="demographicText">{props.value}</span><br />
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
          <tr>
            <th>Invoice No.</th>
            <th>Date</th>
            <th>Billing Address</th>
            <th>Total</th>
          </tr>
          {invoiceLines}
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
