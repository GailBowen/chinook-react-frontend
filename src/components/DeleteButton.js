import React, { useState } from 'react';

const DeleteButton = (props) => {
  const handleDelete = props.handleDelete;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleButton = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <>
      <div className="delete">
        <button onClick={handleButton}>Delete</button>
      </div>
      {showConfirm && <div className="confirmDelete">
        <span>To confirm deletetion, </span>
        <button className="linkButton" onClick={handleDelete}>Click here</button>
      </div>}
    </>
  );
};

export default DeleteButton;
