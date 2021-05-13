import React from "react";
import Button from "@material-ui/core/Button";

type PropsType = {
  AddTask: () => void;
};

const ButtonComponent: React.FC<PropsType> = (props) => {
  return (
    <Button
      type="submit"
      onClick={() => props.AddTask()}
      variant="contained"
      color="primary"
    >
      Add Task
    </Button>
  );
};

export default ButtonComponent;
