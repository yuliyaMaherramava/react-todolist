import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";

type PropsType = {
  newTaskText: string;
  updateNewTaskText: (text: string) => void;
};

const InputComponent: React.FC<PropsType> = (props) => {
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

export default InputComponent;
