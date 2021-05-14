import React from 'react';
import Button from '@material-ui/core/Button';

type PropsType = {
  addTask: () => void;
};

const ButtonComponent: React.FC<PropsType> = ({ addTask }) => (
  <Button type="submit" onClick={addTask} variant="contained" color="primary">
    Add Task
  </Button>
);

export default ButtonComponent;
