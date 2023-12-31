import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Table from "./components/Table/Table.js";
import DeleteButton from "./components/DeleteButton/DeleteButton.js";
import Pagination from "./components/Page/Page.js";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingUser, setEditingUser] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Function to filter users based on search query
  const filterUsers = (user) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.role.toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  //  function handle the select All selection.
  const selectAllRows = () => {
    if (selectedRows.length === displayedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayedUsers.map((user) => user.id));
    }
  };

  const toggleRowSelection = (userId) => {
    // Check if the userId is in the selectedRows array
    const isSelected = selectedRows.includes(userId);

    // Create a new array with the updated selection
    const updatedSelection = isSelected
      ? selectedRows.filter((id) => id !== userId) // Deselect the row
      : [...selectedRows, userId]; // Select the row

    // Update the selectedRows state with the new array
    setSelectedRows(updatedSelection);
  };

  const handleEditClick = (user, field, value) => {
    if (editingUser && editingUser.id === user.id) {
      setEditingUser({ ...editingUser, [field]: value });
    } else {
      setEditingUser({ ...user, [field]: value });
    }
  };

  const handleSaveEdit = (editedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingUser(null);
    alert("User data saved successfully!");
  };

  const handleDeleteRow = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    alert("User deleted successfully!");
  };

  // Handle delete user data
  const deleteSelectedRows = () => {
    if (selectedRows.length > 0) {
      // Display an alert before deleting
      if (window.confirm("Are you sure you want to delete selected rows?")) {
        const updatedUsers = users.filter(
          (user) => !selectedRows.includes(user.id)
        );
        setUsers(updatedUsers);
        setSelectedRows([]);
        alert("Selected rows deleted successfully!");
      }
    } else {
      // If no rows are selected, show an alert
      alert("Please select rows to delete.");
    }
  };

  // Calculate total pages based on the filtered users
  const totalPages = Math.ceil(users.filter(filterUsers).length / itemsPerPage);
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = currentPage * itemsPerPage;
  const displayedUsers = users.filter(filterUsers).slice(firstIndex, lastIndex);

  // Pagination controls
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <Table
        displayedUsers={displayedUsers}
        selectedRows={selectedRows}
        toggleRowSelection={toggleRowSelection}
        handleEditClick={handleEditClick}
        handleDeleteRow={handleDeleteRow}
        editingUser={editingUser}
        handleSaveEdit={handleSaveEdit}
        selectAllRows={selectAllRows}
      />
      <DeleteButton deleteSelectedRows={deleteSelectedRows} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
