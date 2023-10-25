import React, { useState } from "react";
import "../components/EditButton.css";

const EditButton = ({ EditData, setOpenEditModel, SaveEdit }) => {
  const [editedData, setEditedData] = useState({ ...EditData });

  const InputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    SaveEdit(editedData);
    setOpenEditModel(false);
  };

  return (
    <div className="EditButton_1">
      <div className="EditButton_1-content">
        <h3>Edit Row</h3>
        <p>ID: {EditData?.id}</p>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={InputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={editedData.email}
            onChange={InputChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={editedData.role}
            onChange={InputChange}
          />
        </label>
        <div className="EditButton_2">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setOpenEditModel(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditButton;
