const KeyValue = (props) => {
  return (
    <>
      <div className="key-value-row">
        <div className="key-value-label">
          <span className="key-value-label">{props.label}: </span>
        </div>
        <div className="key-value-value">
          <span className="key-value-value">{props.value}</span><br />
        </div>
      </div>
    </>
  );
};

export const KeyValueEditable = (props) => {
  const handleChange = props.handleChange;
  const defaultValue = props.defaultValue;
  const label = props.label;

  return (
    <>
      <div className="key-value-row">
        <div className="key-value-label">
          <span className="key-value-label">{label}: </span>
        </div>
        <div className="key-value-value">
          <input type="text" onChange={handleChange} defaultValue={defaultValue} /> 
        </div>
      </div>
      
    </>
  );
};

export const KeyValueDropDown = (props) => {
  const label = props.label;
  const items = props.items;
  const keyProp = props.keyProp;
  const textProp = props.textProp;
  const defaultValue = props.defaultValue;
  const handleChange = props.handleChange;

  const listItems = items.map((i) => {
    const value = i[keyProp];
    const text = i[textProp];
    
    return <option key={value} value={value}>{text}</option>
  });

  return (
    <>
      <div className="key-value-row">
        <div className="key-value-label">
          <span className="key-value-label">{label}: </span>
        </div>

        <div className="key-value-value">
          <select defaultValue={defaultValue} onChange={handleChange}>
            <option key="-1" value="-1">Please Select...</option>
            {listItems}
          </select>
        </div>
      </div>
    </>
  );
};

export default KeyValue


