import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import "./App.css";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("list")) || [];
  const [input, setInput] = useState("");
  const [groceryList, setGroceryList] = useState(initialState);
  const [editGroceryList, setEditGroceryList] = useState(null);
  const [alertMsg, setAlertMsg] = useState(false);

  const showAlert = (show = false, type = "", message = "") => {
    setAlertMsg({ show, type, message });
  };

  const clearGroceryList = () => {
    showAlert(true, "danger", "Basket is Empty.");
    setGroceryList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <div className="list-container">
      <div>
        <Form
          input={input}
          setInput={setInput}
          groceryList={groceryList}
          setGroceryList={setGroceryList}
          editGroceryList={editGroceryList}
          setEditGroceryList={setEditGroceryList}
          alertMsg={alertMsg}
          showAlert={showAlert}
        />
      </div>
      {groceryList.length > 0 && (
        <div>
          <List
            groceryList={groceryList}
            setGroceryList={setGroceryList}
            setEditGroceryList={setEditGroceryList}
            showAlert={showAlert}
          />
          <button className="clear-button" onClick={clearGroceryList}>Clear List</button>
        </div>
      )}
    </div>
  );
};

export default App;
