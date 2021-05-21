import React, { useState, ChangeEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classes from './index.module.scss';

type PropsType = {
  name: string;
};

const Task: React.FC<PropsType> = ({ name }) => {
  const [editMode, setEditMode] = useState(false);
  const [textInput, setTextInput] = useState<string>('');

  const onTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateTask = () => {
    console.log(
      'soon there will be a function that update the task text in store',
    );
  };

  const onTaskBlur = () => {
    toggleEditMode();
    updateTask();
  };

  return (
    <div className={classes.task} onDoubleClick={toggleEditMode}>
      {!editMode ? (
        <p>{name}</p>
      ) : (
        <input
          onChange={onTaskChange}
          onBlur={onTaskBlur}
          value={textInput}
        />
      )}
      <IconButton aria-label="delete" size="small">
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Task;
