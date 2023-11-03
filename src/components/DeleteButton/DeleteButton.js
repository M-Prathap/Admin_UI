import React from "react";
import "../DeleteButton/DeleteButton.css";

function DeleteButton({ deleteSelectedRows }) {
  return (
    <div>
      <button onClick={deleteSelectedRows} className="deleteButton">
        Delete Selected
      </button>
    </div>
  );
}

export default DeleteButton;
