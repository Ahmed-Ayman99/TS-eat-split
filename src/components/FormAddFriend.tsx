import { type FC, useState, FormEvent, type Dispatch } from "react";
import { v4 as uuid } from "uuid";

import { type User } from "../shared/types";
import { useUserContext } from "../context/userContext";

type Props = {
  setShowAddForm: Dispatch<React.SetStateAction<boolean>>;
};

const FormAddFriend: FC<Props> = ({ setShowAddForm }) => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("https://i.pravatar.cc/48");

  const { addUser } = useUserContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !image) return;

    const newUser: User = {
      id: uuid(),
      balance: 0,
      image,
      name,
    };

    addUser(newUser);
    setShowAddForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label htmlFor="name">👫 Friend name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        id="name"
      />

      <label htmlFor="url">👫 image URL</label>
      <input
        onChange={(e) => setImage(e.target.value)}
        type="text"
        id="url"
        value={image}
      />

      <button className="btn">Add</button>
    </form>
  );
};

export default FormAddFriend;
