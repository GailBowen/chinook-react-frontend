import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GET_CUSTOMER } from './graphql/query/customer';
import { GET_EMPLOYEES } from './graphql/query/employee';

import { UPDATE_CUSTOMER, INSERT_CUSTOMER, DELETE_CUSTOMER } from './graphql/mutation/customer';

import KeyValue, { KeyValueEditable, KeyValueDropDown } from './components/KeyValue';
import EditButtons from './components/EditButtons';

const CustomerContainer = () => {
  let { customerId } = useParams();
  customerId = customerId ? parseInt(customerId) : -1;

  const initCustomerData = {
    CustomerId: -1,
    FirstName: '',
    LastName: '',
    Address: '',
    City: '',
    State: '',
    PostalCode: '',
    SupportRepId: -1,
    Email: ''
  };

  const [customer, setCustomer] = useState(initCustomerData);
  const [invoices, setInvoices] = useState([]);
  const [customerReps, setCustomerReps] = useState([]);

  const history = useHistory();
  
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const [insertCustomer] = useMutation(INSERT_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  let customersLoading = false;
  let customersError = undefined;

  let employeesLoading = false;
  let employeesError = undefined;

  {
    let { loading, error, data } = useQuery(GET_CUSTOMER, {
      variables: { customerId },
      skip: customerId === -1,
      fetchPolicy: "cache-and-network",
    });

    customersLoading = loading;
    customersError = error;

    useEffect(() => {

      if (!data) { 
        return;
      }

      if (data.getCustomer) {
        setCustomer(data.getCustomer);
      }

      if (data.getInvoiceByCustomer) {
        setInvoices(data.getInvoiceByCustomer);
      }
    }, [data]);
  }

  {
    let { loading, error, data } = useQuery(GET_EMPLOYEES, {
      fetchPolicy: "cache-and-network",
    });

    employeesLoading = loading;
    employeesError = error;

    useEffect(() => {
      if (!data) return;

      const es = data.getEmployees.filter((e) => {
        return e.Title === 'Sales Support Agent';
      }).map((e) => {
        const o = e;
        o.Name = `${e.LastName}, ${e.FirstName}`;
        return o;
      });

      setCustomerReps(es);
    }, [data]);
  }

  if (customersError) {
    throw(customersError);
  }

  if (employeesError) {
    throw(employeesError);
  }
    
  if (customersLoading || employeesLoading) {
    return "Loading";
  }

  const updateCustomerField = (fieldName, newValue) => {
    setCustomer((p) => {
      const c = p;
      c[fieldName] = newValue;
      return c;      
    });
  };

  const firstNameChanged = (e) => updateCustomerField('FirstName', e.target.value);
  const lastNameChanged = (e) => updateCustomerField('LastName', e.target.value);
  const addressChanged = (e) => updateCustomerField('Address', e.target.value);
  const cityChanged = (e) => updateCustomerField('City', e.target.value);
  const stateChanged = (e) => updateCustomerField('State', e.target.value);
  const postalCodeChanged = (e) => updateCustomerField('PostalCode', e.target.value);
  const countryChanged = (e) => updateCustomerField('Country', e.target.value);
  const emailChanged = (e) => updateCustomerField('Email', e.target.value);

  const handleSupportRepChanged = (e) => {
    updateCustomerField('SupportRepId', e.target.value);
  };

  const getParams = () => {
    return {
      customerId: customer.CustomerId,
      firstName: customer.FirstName,
      lastName: customer.LastName,
      address: customer.Address,
      city: customer.City,
      state: customer.State,
      postalCode: customer.PostalCode,
      country: customer.Country,
      email: customer.Email,
      supportRepId: parseInt(customer.SupportRepId),
    };
  };

  const handleUpdate = () => {
    updateCustomer({
      variables: getParams(), 
    }).then(() => {
      history.push('/customers');
    });
  };

  const handleInsert = () => {
    const v = getParams();
    delete v.customerId;

    insertCustomer({
      variables: v,
    }).then(() => {
      history.push('/customers');
    });;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (customer.CustomerId > -1) {
      handleUpdate();
    } else {
      handleInsert();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deleteCustomer({
      variables: { customerId: customer.CustomerId },
    }).then(() => {
      history.push('/customers');
    });
  };

  const canDelete = () => customer.CustomerId > -1;

  return (
    <>
      <h1>Customer</h1>

      <h2>Demographics</h2>
      <form>
        <div className="key-value-rows">
          {customerId > -1 && <KeyValue label="Id" value={customer.CustomerId} />}
          <KeyValueEditable label="First Name" defaultValue={customer.FirstName} handleChange={firstNameChanged} />
          <KeyValueEditable label="Last Name" defaultValue={customer.LastName} handleChange={lastNameChanged} />
          <KeyValueEditable label="Address" defaultValue={customer.Address} handleChange={addressChanged} />
          <KeyValueEditable label="City" defaultValue={customer.City} handleChange={cityChanged} />
          <KeyValueEditable label="State" defaultValue={customer.State} handleChange={stateChanged} />
          <KeyValueEditable label="Postal Code" defaultValue={customer.PostalCode} handleChange={postalCodeChanged} />
          <KeyValueEditable label="Country" defaultValue={customer.Country} handleChange={countryChanged} />
          <KeyValueEditable label="Email" defaultValue={customer.Email} handleChange={emailChanged} />

          <KeyValueDropDown label="Support Rep" items={customerReps} keyProp="EmployeeId" 
            textProp="Name" defaultValue={customer.SupportRepId} handleChange={handleSupportRepChanged} />
        </div>

        <EditButtons handleSubmit={handleSave} handleDelete={handleDelete} canDelete={canDelete} />
      </form>

      {customerId > -1 && <div>
        <h2>Invoices</h2>
        <Invoices invoices={invoices} />
      </div>}
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
