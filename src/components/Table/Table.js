import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../Table/Table.css";

function Table({
  displayedUsers,
  selectedRows,
  toggleRowSelection,
  handleEditClick,
  handleDeleteRow,
  editingUser,
  handleSaveEdit,
  selectAllRows,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={
                selectedRows.length === displayedUsers.length &&
                selectedRows.length > 0
              }
              onChange={selectAllRows}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {displayedUsers.map((user) => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => toggleRowSelection(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>
              {editingUser && editingUser.id === user.id ? (
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    handleEditClick(user, "name", e.target.value)
                  }
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingUser && editingUser.id === user.id ? (
                <input
                  type="text"
                  value={editingUser.email}
                  onChange={(e) =>
                    handleEditClick(user, "email", e.target.value)
                  }
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingUser && editingUser.id === user.id ? (
                <input
                  type="text"
                  value={editingUser.role}
                  onChange={(e) =>
                    handleEditClick(user, "role", e.target.value)
                  }
                />
              ) : (
                user.role
              )}
            </td>
            <td>
              {editingUser && editingUser.id === user.id ? (
                <div className="buttons">
                  <button onClick={() => handleSaveEdit(editingUser)}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button onClick={() => handleEditClick(user)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteRow(user.id)}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
