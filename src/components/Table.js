import React from "react";
import ClientData from "./ClientData";
import "../components/Table.css";

const Table = ({
  clint,
  SelectRows,
  RowSelection,
  Edit,
  Delete,
  SelectAllRows,
}) => {
  const currentUsers = clint.slice(0, 10);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={SelectRows.length === currentUsers.length}
              onChange={SelectAllRows}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clint.map((user) => (
          <ClientData
            key={user.id}
            user={user}
            selected={SelectRows.includes(user.id)}
            RowSelection={RowSelection}
            Edit={Edit}
            Delete={Delete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
