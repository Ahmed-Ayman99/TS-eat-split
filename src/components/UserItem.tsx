import { type FC } from "react";

import { User } from "../shared/types";
import { useUserContext } from "../context/userContext";

type Props = {
  user: User;
  isSelected: boolean;
};

const UserItem: FC<Props> = ({ user, isSelected }) => {
  const { handleSelectedId } = useUserContext();

  const balanceText = (() => {
    if (user.balance > 0) {
      return (
        <p className="green">
          {user.name} owes you {Math.abs(user.balance)}€
        </p>
      );
    }

    if (user.balance < 0) {
      return (
        <p className="red">
          You owe {user.name} {Math.abs(user.balance)}€
        </p>
      );
    }

    return <p>You and {user.name} are even</p>;
  })();

  return (
    <li className={`${isSelected ? "selected" : ""}`}>
      <img alt={user.name} src={user.image} />
      <h3>{user.name}</h3>

      {balanceText}

      <button className="btn" onClick={() => handleSelectedId(user.id)}>
        {isSelected ? "Close" : "Open"}
      </button>
    </li>
  );
};

export default UserItem;
