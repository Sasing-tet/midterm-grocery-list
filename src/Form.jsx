import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; //universal unique identifier
import AlertMessage from "./AlertMessage";

const Form = ({
  input,
  setInput,
  groceryList,
  setGroceryList,
  editGroceryList,
  setEditGroceryList,
  alertMsg,
  showAlert,
}) => {
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const updateGroceryItem = (title, id) => {
    const newGroceryItem = groceryList.map((groceryItem) =>
      groceryItem.id === id ? { title, id } : groceryItem
    );
    setGroceryList(newGroceryItem);
    setEditGroceryList("");
  };

  useEffect(() => {
    if (editGroceryList) {
      setInput(editGroceryList.title);
    } else {
      setInput("");
    }
  }, [setInput, editGroceryList]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (input.trim().length === 0) {
      showAlert(true, "danger", "Invalid. Input Field is empty.");
    } else if (!editGroceryList) {
      showAlert(true, "success", `'${input}' added to the Basket`);
      setGroceryList([...groceryList, { id: uuidv4(), title: input }]);
      setInput("");
    } else {
      showAlert(true, "success", `Item changed to '${input}'`);
      updateGroceryItem(input, editGroceryList.id);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      {alertMsg.show && (
        <AlertMessage
          {...alertMsg}
          removeAlert={showAlert}
          groceryList={groceryList}
        />
      )}
      <h2 className="project-title">Grocery List</h2>
      <div className="input-container">
      <input
        className="user-input"
        type="text"
        placeholder="Input grocery Item, i.e. eggs"
        value={input}
        onChange={onInputChange}
      ></input>
      <button className="submit-button" type="submit">
        {editGroceryList ? "edit" : "Submit"}
      </button>
      </div>
    </form>
  );
};

export default Form;
