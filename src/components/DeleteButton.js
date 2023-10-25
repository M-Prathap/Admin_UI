import React from "react";
import "../components/DeleteButton.css";

const DeleteButton = ({ DeleteSelected, SelectRows }) => {
  return (
    <button
      className="delete_Button"
      onClick={DeleteSelected}
      disabled={SelectRows.length === 0}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
