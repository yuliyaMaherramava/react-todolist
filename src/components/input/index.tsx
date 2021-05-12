import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { StateType } from "../../store/redux-store";
import { updateNewTaskText } from "../../store/addtodo-reducer";
import { TextField } from "@material-ui/core";

type PropsType = {
  newTaskText: string;
  updateNewTaskText: (text: string) => void;
};

const Input: React.FC<PropsType> = (props) => {
  let onNewTaskTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.updateNewTaskText(e.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Enter a task"
      variant="outlined"
      size="medium"
      type="text"
      value={props.newTaskText}
      onChange={onNewTaskTextChange}
    />
  );
};

let mapStateToProps = (state: StateType) => {
  return {
    newTaskText: state.Todo.newTaskText,
  };
};

let mapDispatchToProps = (dispatch: any) => {
  return {
    updateNewTaskText: (text: string) => {
      let action = updateNewTaskText(text);
      dispatch(action);
    },
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps)(Input);

export default InputContainer;
