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
      <div className="delete-component">
        <div className="delete">
          <button onClick={handleButton}>Delete</button>
        </div>
        {showConfirm && <div className="confirmDelete">
          <span>To confirm deletetion, </span>
          <button className="link-button" onClick={handleDelete}>Click here</button>
        </div>}
      </div>
    </>
  );
};

export default DeleteButton;
