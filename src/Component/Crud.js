import React, { useEffect, useState } from "react";
import "../App.css";

// to get from local storage

function getLocalItem() {
  let list = localStorage.getItem("List");
  console.log("List");

  if (list) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
}

function Crud() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalItem());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  function addData() {
    if (!inputData) {
      alert("Fill the Data");
    } else if (inputData && !toggleSubmit) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, allInputData]);
      setInputData("");
    }
  }

  function deleteItem(index) {
    const updated = item.filter((elem) => {
      return index !== elem.id;
    });

    setItem(updated);
  }

  function editItem(id) {
    let newEditItem = item.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
    console.log(newEditItem);
  }
  function remove() {
    setItem([]);
  }

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="toDoContainer">
        <div className="main-container">
          <div className="heading">
            <h1>CRUD Operation</h1>
          </div>

          <div className="addItems">
            <input
              type="text"
              className="input-add"
              placeholder="Add items here"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggleSubmit ? (
              <i
                class="fa-solid fa-plus"
                title="Add Item"
                onClick={addData}
              ></i>
            ) : (
              <i
                class="fa-solid fa-pen-to-square edit"
                title="Edit item"
                onClick={addData}
              ></i>
            )}
          </div>

          <div className="showItems">
            {item.map((elem) => {
              return (
                <div className="itemList" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <i
                    class="fa-solid fa-pen-to-square edit"
                    title="Edit item"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    class="fa-solid fa-delete-left plus"
                    title="Delete item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              );
            })}
          </div>

          <div className="buttons">
            <button className="btn" data-sm-link-text="remove" onClick={remove}>
              <span>remove all</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;
