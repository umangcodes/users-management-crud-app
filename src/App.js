import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import UserTable from "./components/tables/UserTable";
import userdata from "./userdata/users";
import React, { useEffect, useState } from "react";
import AddUserForm from "./components/forms/AddUserForm";
import EditUserForm from "./components/forms/EditUserForm";
function App() {
  let localStore = JSON.parse(localStorage.getItem("users"));

  const checkForData = () => {
    if (localStore === null) {
      console.log("user data null");
      localStore = userdata;
      console.log(localStore);
    }
    console.log(localStore);
  };
  checkForData();

  const [users, setUsers] = useState(localStore);
  const [editMode, setEditMode] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const editRow = (user) => {
    setEditMode(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const deleteUser = (id) => {
    setEditMode(false);
    setUsers(users.filter((user) => user.id !== id));
  };
  const updateUser = (id, updatedUser) => {
    setEditMode(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log("use effect triggered");
  }, [users]);
  return (
    <div className="App">
      <Navbar />
      <div className="flex-row">
        <div className="flex-large">
          {editMode ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditMode}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
