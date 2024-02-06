import { useState } from "react";

import UsersList from "./components/UsersList";
import FormSplit from "./components/FormSplit";
import FormAddFriend from "./components/FormAddFriend";
import { useUserContext } from "./context/userContext";

const App = () => {
  const { selectedUserId, removeSelectedId } = useUserContext();
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleShowForm = () => {
    setShowAddForm((prev) => !prev);
    if (!showAddForm) removeSelectedId();
  };

  return (
    <main className="main">
      <aside className="sidebar">
        <UsersList />

        {showAddForm && <FormAddFriend setShowAddForm={setShowAddForm} />}
        <button onClick={handleShowForm} className="btn">
          {showAddForm ? "close" : "Add User"}
        </button>
      </aside>

      <div>{selectedUserId && <FormSplit key={selectedUserId} />}</div>
    </main>
  );
};

export default App;
