import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

type PropsType = {
  name: string;
};

const Task: React.FC<PropsType> = (props) => {
  return (
    <div className="task">
      <p>{props.name}</p>
      <IconButton aria-label="delete" size="small">
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Task;
