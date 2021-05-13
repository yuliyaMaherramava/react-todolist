import React from "react";
import Task from "./Task";
import Paper from "@material-ui/core/Paper";
import { TaskType } from "../../App";

type PropsType = {
  name: string;
  tasks: { [key: string]: TaskType };
  tasksIdFromColumn: Array<string>;
};

const Column: React.FC<PropsType> = (props) => {
  let taskElements = props.tasksIdFromColumn.map((id: string) => (
    <Task key={id} name={props.tasks[id].name} />
  ));

  return (
    <Paper elevation={3} className="column">
      <h3>{props.name}</h3>
      {taskElements}
    </Paper>
  );
};

export default Column;
