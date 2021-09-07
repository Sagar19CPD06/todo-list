import React, { useState } from "react";
import { Button, InputLabel, Input, Modal } from "@material-ui/core";
import db from "./firebase";
import EditIcon from "@material-ui/icons/Edit";
import { DeleteForever } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import "./Todo.css";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(true);
  const [input, setInput] = useState(props.todo.todo);

  const updateTodo = (event) => {
    //update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <InputLabel>Enter New Todo</InputLabel>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provied) => (
          <li
            className="todo__item"
            {...provied.draggableProps}
            {...provied.dragHandleProps}
            ref={provied.innerRef}
          >
            <div className="todo_text" style={{ fontSize: 25 }}>
              {props.todo.todo}
            </div>
            <EditIcon className="edit-icon" onClick={handleClose} />
            <DeleteForever
              onClick={(event) => {
                db.collection("todos").doc(props.todo.id).delete();
              }}
            />
          </li>
        )}
      </Draggable>
    </>
  );
}

export default Todo;
