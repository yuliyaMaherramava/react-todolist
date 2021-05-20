import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classes from './index.module.scss';
import { deleteTask, editTask } from '../../../store/actions';

type PropsType = {
  name: string;
  id: string;
  columnId: string;
};

const Task: React.FC<PropsType> = ({ name, id, columnId }) => {
  const [editMode, setEditMode] = useState(false);
  const [textInput, setTextInput] = useState<string>(name);
  const dispatch = useDispatch();

  const onTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateTask = () => {
    dispatch(editTask(id, textInput));
  };

  const onTaskBlur = () => {
    toggleEditMode();
    updateTask();
  };

  const onDeleteTask = () => {
    dispatch(deleteTask(id, columnId));
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
          placeholder={textInput}
        />
      )}
      <IconButton aria-label="delete" size="small" onClick={onDeleteTask}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Task;
