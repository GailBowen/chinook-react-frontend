import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import KeyValue from './KeyValue';

const QUERY = gql`
  query getInvoice($invoiceId: Int!) {
    getInvoice(invoiceId: $invoiceId) {
      InvoiceDate
      BillingAddress
      BillingCity
      BillingState
      BillingCountry
      BillingPostalCode
      Total
    }
    getInvoiceLines(invoiceId: $invoiceId) {
      InvoiceLineId
      TrackId
      UnitPrice
      Quantity
      TrackName
    }
  }
`;

const InvoiceContainer = () => {
  let { invoiceId } = useParams();
  invoiceId = parseInt(invoiceId);

  let { loading, error, data } = useQuery(QUERY, {
    variables: { invoiceId }
  });

  if (loading) {
    return "loading";
  }

  const invoice = data.getInvoice;
  const invoiceLines = data.getInvoiceLines.map((x) => {
    return <InvoiceLine key={x.InvoiceLineId} line={x} />;
  });

  return ( 
    <>
    <h1>Invoice {invoiceId}</h1>
    
    <h2>Delivery Details</h2>
    <KeyValue label="Billing Address" value={invoice.BillingAddress} />
    <KeyValue label="Billing City" value={invoice.BillingCity} />
    <KeyValue label="Billing State" value={invoice.BillingState} />
    <KeyValue label="Billing Postal Code" value={invoice.BillingPostalCode} />
    <br />
    <KeyValue label="Invoice Total" value={invoice.Total} />

    <h2>Invoice Lines</h2>

    <table>
      <thead>
        <tr>
          <th>Track Id</th>
          <th>Track Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Line Total</th>
        </tr>
      </thead>
      <tbody>
        {invoiceLines}
      </tbody>
    </table>
    </>
  );
}

const InvoiceLine = (props) => {
  const line = props.line;
  return (
    <>
    <tr>
      <td>{line.TrackId}</td>
      <td>{line.TrackName}</td>
      <td>{line.UnitPrice}</td>
      <td>{line.Quantity}</td>
      <td>{line.UnitPrice*line.Quantity}</td>
    </tr>
    </>
  );
}

export default InvoiceContainer;
