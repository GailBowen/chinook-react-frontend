import DeleteButton from './DeleteButton';

const EditButtons = (props) => {
  const handleSubmit = props.handleSubmit;
  const handleDelete = props.handleDelete;
  const canDelete = props.canDelete;

  return (
    <div className="edit-buttons">
      <div>
        <input type="submit" value="Save" onClick={handleSubmit} />
      </div>
      {canDelete() &&
        <DeleteButton handleDelete={handleDelete} /> 
        }
    </div>
  );
};

export default EditButtons;
