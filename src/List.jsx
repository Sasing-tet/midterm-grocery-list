import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const GroceryListItems = ({
  groceryList,
  setGroceryList,
  setEditGroceryList,
  showAlert,
}) => {
  const handleDelete = ({ id }) => {
    showAlert(true, "danger", `Item removed from the Basket.`);
    setGroceryList(groceryList.filter((groceryItem) => groceryItem.id !== id));
  };

  const handleEdit = ({ id }) => {
    const findGroceryItem = groceryList.find(
      (groceryItem) => groceryItem.id === id
    );
    setEditGroceryList(findGroceryItem);
  };

  return (
    <div className="list-items">
      {groceryList.map((groceryItem) => (
        <li key={groceryItem.id}>
          <div><p>{groceryItem.title}</p></div>
          <div>
            <button className="edit-button" onClick={() => handleEdit(groceryItem)}>
              <FaEdit />
            </button>
            <button className="delete-button" onClick={() => handleDelete(groceryItem)}>
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default GroceryListItems;
