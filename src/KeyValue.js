const KeyValue = (props) => {
  return (
    <>
      <span className="demographicLabel">{props.label}: </span>
      <span className="demographicText">{props.value}</span><br />
    </>
  );
};

export default KeyValue


