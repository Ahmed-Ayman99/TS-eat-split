import {
  type FC,
  type PropsWithChildren,
  useContext,
  createContext,
  useState,
} from "react";

import { User } from "../shared/types";

// Types
type UserContextType = {
  users: User[];
  selectedUserId: string;
  handleSelectedId: (id: string) => void;
  removeSelectedId: () => void;
  editeUserBalance: (balance: number) => void;
  addUser: (newUser: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [users, setUsers] = useState<User[]>([
    {
      id: "118836",
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: "933372",
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: "499476",
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);

  const handleSelectedId = (id: string) =>
    setSelectedUserId((prev) => (prev === id ? "" : id));
  const removeSelectedId = () => setSelectedUserId("");
  const addUser = (newUser: User) => setUsers((prev) => [...prev, newUser]);

  const editeUserBalance = (balance: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUserId ? { ...user, balance: balance } : user
      )
    );
  };

  const sharedValues: UserContextType = {
    users,
    selectedUserId,
    handleSelectedId,
    removeSelectedId,
    editeUserBalance,
    addUser,
  };

  return (
    <UserContext.Provider value={sharedValues}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
};
