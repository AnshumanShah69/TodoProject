//here using bootstrap  css

import React, { useEffect } from "react";
import { useState } from "react";

//so basically this is to get the stored list when we refreshed the page
const getFromStorage = () => {
  let mylist = localStorage.getItem("mylists");
  if (mylist) {
    return JSON.parse(localStorage.getItem("mylists")); //this gets in the form of object
  } else {
    return [];
  }
};

const Mytodo = () => {
  const [newInputData, setFromInput] = useState(""); ///hook used for input tag
  const [newUpdItems, updateItems] = useState(getFromStorage()); ///hook used to update item

  ///this is to add the item to the list
  const addMyItem = () => {
    if (!newInputData) {
      return;
    } else {
      updateItems([...newUpdItems, newInputData]);
      setFromInput("");
    }
  };

  ///this is used to delete the items from the task list
  const deleteMyItem = (id) => {
    const updatedItems = newUpdItems.filter((elem, ind) => {
      return ind !== id;
    });
    updateItems(updatedItems);
  };
  ///this is to clear all the tasks from to do
  const clearAll = () => {
    updateItems([]);
  };
  ///as we get it in the form of string we convert and put it inside the list
  useEffect(() => {
    localStorage.setItem("mylists", JSON.stringify(newUpdItems));
  }, [newUpdItems]);
  ///here specified the buttons for the tasks
  return (
    <div
      className="main-div d-flex justify-content-center align-newUpdItems-center"
      style={{ backgroundColor: "lavender", minHeight: "100vh" }}
    >
      <div className="child-div text-center">
        <h1>Please add your daily task to work on</h1>

        <div className="addItems">
          <input
            className="form-control"
            placeholder="add your daily tasks to complete"
            type="text"
            value={newInputData}
            onChange={(e) => setFromInput(e.target.value)}
          />
          <button className="btn btn-primary my-3" onClick={addMyItem}>
            Add new tasks
          </button>
        </div>

        <div className="showItems">
          {newUpdItems.map((elem, ind) => {
            return (
              <div className="eachItem" key={ind}>
                <h4>{elem}</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteMyItem(ind)}
                >
                  Delete tasks
                </button>
              </div>
            );
          })}
        </div>

        <div className="showItems">
          <button className="btn btn-primary my-3" onClick={clearAll}>
            <span>Delete all items</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mytodo;
