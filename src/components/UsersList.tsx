import { type FC } from "react";

import UserItem from "./UserItem";
import { useUserContext } from "../context/userContext";

const UsersList: FC = () => {
  const { users, selectedUserId } = useUserContext();

  return (
    <ul>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
        />
      ))}
    </ul>
  );
};

export default UsersList;
