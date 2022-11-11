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
    //initalize new grocery item and store the mapped item that fits the condition
    const newGroceryItem = groceryList.map((groceryItem) =>
      groceryItem.id === id ? { title, id } : groceryItem
    );
    //updates the item by setting set grocery list to new grocery item
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
    if (input.trim().length === 0) { //if user input is empty when pressing submit or pressing enter
      showAlert(true, "danger", "Invalid. Input Field is empty."); 
    } else if (!editGroceryList) { //if user input does not click edit button
      showAlert(true, "success", `'${input}' added to the Basket`);
      setGroceryList([...groceryList, { id: uuidv4(), title: input }]);
      setInput("");
    } else { //default set to when edit button is pressed
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
