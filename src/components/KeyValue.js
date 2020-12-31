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

export default KeyValue


