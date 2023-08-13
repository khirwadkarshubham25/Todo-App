import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Todo.css";

const Todo = () => {
  const [text, setText] = useState("");
  const [arrayList, setArrayList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleArray = () => {
    if (!text) {
      return;
    } else {
      setArrayList([...arrayList, { text, completed: false }]);
      setText("");
    }
  };

  const handleDelete = (index) => {
    const filteredArray = arrayList.filter((item, indx) => {
      return index !== indx;
    });
    setArrayList(filteredArray);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(arrayList[index].text);
  };

  const handleSave = (index) => {
    if (editText.trim() !== "") {
      const updatedArray = [...arrayList];
      updatedArray[index].text = editText;
      setArrayList(updatedArray);
      setEditIndex(-1);
      setEditText("");
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditText("");
  };

  const handleToggleCompletion = (index) => {
    const updatedArray = arrayList.map((item, indx) => {
      if (index === indx) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    const removedElement = updatedArray.splice(index, 1)[0]; // Remove and store the removed element
    if(removedElement.completed){
        updatedArray.push(removedElement);
    }
    else{
        updatedArray.unshift(removedElement);
    }
    setArrayList(updatedArray);
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleArray}>Add Task</button>
      </div>

      <ul className="task-list">
        {arrayList.map((item, index) => {
          return (
            <li key={index} className="task-item">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="icon-container">
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleCompletion(index)}
                  />

                  {item.completed ? <del>{item.text}</del>: item.text}
                  <div className="icon-container">
                    <i
                      aria-hidden="true"
                      onClick={() => handleEdit(index)}
                    ><FaEdit /></i>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handleDelete(index)}
                    ><FaTrashAlt /></i>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;