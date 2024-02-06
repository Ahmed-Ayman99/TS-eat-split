import { FormEvent, useState } from "react";
import { useUserContext } from "../context/userContext";

const FormSplit = () => {
  const { users, selectedUserId, removeSelectedId, editeUserBalance } =
    useUserContext();

  const selectedUser = users.find((user) => user.id === selectedUserId)!;

  const [billValue, setBillValue] = useState<number>();
  const [myExpense, setMyExpense] = useState<number>();
  const [userExpense, setUserExpense] = useState<number>();
  const [whoIsPaying, setWhoIsPaying] = useState<string>("you");

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!billValue || !myExpense || !userExpense) return;
    const balance =
      whoIsPaying === "you"
        ? billValue - myExpense
        : (billValue - userExpense) * -1;

    editeUserBalance(balance);
    removeSelectedId();
  };
  return (
    <form onSubmit={handelSubmit} className="form-split-bill">
      <h2>split a bill with {selectedUser.name}</h2>

      <label className="" htmlFor="bill-val">
        💰 Bill value
      </label>
      <input
        onChange={(e) => setBillValue(+e.target.value)}
        value={billValue}
        type="number"
        id="bill-val"
      />

      <label className="" htmlFor="my-expense">
        🧍‍♀️ Your expense
      </label>
      <input
        onChange={(e) => {
          setMyExpense(+e.target.value);
          setUserExpense((billValue as number) - +e.target.value);
        }}
        disabled={!billValue}
        value={myExpense}
        type="number"
        id="my-expense"
      />

      <label className="" htmlFor="user-expense">
        👫 {selectedUser.name} expense
      </label>
      <input disabled value={userExpense} type="number" id="user-expense" />

      <label className="" htmlFor="who-pay">
        🤑 Who is paying the bill
      </label>

      <select
        onChange={(e) => setWhoIsPaying(e.target.value)}
        value={whoIsPaying}
      >
        <option value="you">You</option>
        <option value={selectedUser.name}>{selectedUser.name}</option>
      </select>

      <button className="btn">Add</button>
    </form>
  );
};

export default FormSplit;
