import React from 'react';
import Paper from '@material-ui/core/Paper';
import Task from './task';
import classes from './index.module.scss';
import { PropsType } from '../../types';

const Column: React.FC<PropsType> = ({ name, tasks }) => {
  const taskElements = tasks.map((task) => (
    <Task key={task.id} name={task.name} />
  ));

  return (
    <Paper elevation={3} className={classes.column}>
      <h3>{name}</h3>
      {taskElements}
    </Paper>
  );
};

export default Column;
