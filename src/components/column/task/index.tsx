import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classes from './index.module.scss';

type PropsType = {
  name: string;
};

const Task: React.FC<PropsType> = ({ name }) => (
  <div className={classes.task}>
    <p>{name}</p>
    <IconButton aria-label="delete" size="small">
      <CloseIcon fontSize="small" />
    </IconButton>
  </div>
);

export default Task;
