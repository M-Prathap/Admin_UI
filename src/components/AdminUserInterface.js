// Admin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/AdminUserInterface.css";
import { toast } from "react-toastify";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Pagination from "./Page";
import SearchBox from "./SearchBox";
import Table from "./Table";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Admin = () => {
  const [clint, setclint] = useState([]);
  const [filteredclint, setFilteredclint] = useState([]);
  const [lastUbdatePage, setlastUbdatePage] = useState(1);
  const [search, setSearch] = useState("");
  const [SelectRows, setSelectRows] = useState([]);
  const [OpenEditModel, setOpenEditModel] = useState(false);
  const [EditData, setEditData] = useState(null);

  const PerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setclint(response.data);
      setFilteredclint(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const ClientSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = clint.filter(
      (user) =>
        user.id.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredclint(filtered);
    setlastUbdatePage(1);
  };

  const Edit = (id) => {
    const rowToEdit = filteredclint.find((user) => user.id === id);
    setEditData(rowToEdit);
    setOpenEditModel(true);
  };

  const SaveEdit = (editedUserData) => {
    const updatedData = clint.map((user) =>
      user.id === editedUserData.id ? editedUserData : user
    );

    setclint(updatedData);
    setFilteredclint(updatedData);

    toast.success("Data Updated Successfully!");
    setOpenEditModel(false);
  };

  const Delete = (id) => {
    if (!SelectRows.includes(id)) {
      toast.error("Please select the row before trying to delete.");
      return;
    }

    setFilteredclint((prevFilteredclint) =>
      prevFilteredclint.filter((user) => user.id !== id)
    );

    toast.error("Deleted Successfully!");
  };

  const PageNevigation = (page) => {
    setlastUbdatePage(page);
  };

  const RowSelection = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setSelectRows((prevSelectRows) => [...prevSelectRows, id]);
      toast.success("Selected", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setSelectRows((prevSelectRows) =>
        prevSelectRows.filter((rowId) => rowId !== id)
      );
    }
  };

  const SelectAllRows = (event) => {
    const { checked } = event.target;
    const allRowIds = currentUsers.map((user) => user.id);

    if (checked && SelectRows.length !== allRowIds.length) {
      setSelectRows(allRowIds);
      toast.warn("Hey You Selected All!", {
        position: toast.POSITION.TOP_CENTER,
        style: {
          background: "red",
          color: "white",
        },
      });
    } else {
      setSelectRows([]);
    }
  };

  const DeleteSelected = () => {
    const updatedUsers = clint.filter((user) => !SelectRows.includes(user.id));
    setclint(updatedUsers);
    setFilteredclint(updatedUsers);
    setSelectRows([]);
    toast.error("Selected rows deleted successfully");
  };

  const startingpage = (lastUbdatePage - 1) * PerPage;
  const endpage = startingpage + PerPage;
  const currentUsers = filteredclint.slice(startingpage, endpage);

  return (
    <div className="Container">
      <SearchBox search={search} ClientSearch={ClientSearch} />
      <Table
        clint={currentUsers}
        SelectRows={SelectRows}
        RowSelection={RowSelection}
        Edit={Edit}
        Delete={Delete}
        SelectAllRows={SelectAllRows}
      />
      <Pagination
        lastUbdatePage={lastUbdatePage}
        PerPage={PerPage}
        totalContent={filteredclint.length}
        PageNevigation={PageNevigation}
      />
      <DeleteButton DeleteSelected={DeleteSelected} SelectRows={SelectRows} />
      {OpenEditModel && (
        <EditButton
          EditData={EditData}
          setOpenEditModel={setOpenEditModel}
          SaveEdit={SaveEdit}
        />
      )}
    </div>
  );
};

export default Admin;
