import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 1. when the app loads, we need to listen to the database and fetch new
  // todos as they added/removed.
  useEffect(() => {
    // this code runs when the app.js loads
    db.collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todo: doc.data().todo,
            };
          })
        );
      });
  }, []);

  const addTodo = (event) => {
    // - here I want prevent default behaviour of form using
    // 😣 preventDefault() 😣 funtion.
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // this will called when we click 📲 the button!
    setInput("");
  };
  const onChangeHandler = (event) => setInput(event.target.value);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };
  return (
    <div className="todo-app">
      <div className="heading">
        <div>Hey Buddy❕ 😎</div>
        <div>🔥 What's your Plan for Today ❔ 🔥</div>
      </div>
      <form className="todo-form">
        <FormControl>
          <Input
            style={{ fontSize: 20 }}
            placeholder="✅ Write Todo List:"
            className="todo-input"
            value={input}
            onChange={onChangeHandler}
          />
        </FormControl>
        <button
          style={{ fontSize: 20 }}
          className="todo-button"
          disabled={!input}
          variant="contained"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </form>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="todo__list"
            >
              {todos.map((todo, index) => (
                <Todo
                  todo={todo}
                  index={index}
                  id={todo.id}
                  key={todo.id}
                ></Todo>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
