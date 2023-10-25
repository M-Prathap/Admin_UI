import React from "react";
import "../components/ClientData.css";

const ClientData = ({ user, selected, RowSelection, Edit, Delete }) => {
  return (
    <tr className={selected ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => RowSelection(event, user.id)}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="btn-container">
        <button onClick={() => Edit(user.id)}>
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => Delete(user.id)}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default ClientData;
