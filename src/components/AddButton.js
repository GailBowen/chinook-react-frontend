const AddButton = (props) => {
  const handleClick = props.handleClick;
  const caption = props.caption;
  
  return (
    <div className="add-button">
      <button onClick={handleClick} className="add">{caption}</button>
    </div>
  );
};

export default AddButton;
