import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classes from './index.module.scss';
import { deleteTask, editTask } from '../../../store/actions';

type PropsType = {
  name: string;
  id: string;
  columnId: string;
  index: number;
};

const Task: React.FC<PropsType> = ({ name, id, columnId, index }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskText, setTaskText] = useState<string>(name);
  const dispatch = useDispatch();

  const onTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateTask = () => {
    dispatch(editTask(id, taskText));
  };

  const onTaskBlur = () => {
    toggleEditMode();
    updateTask();
  };

  const onDeleteTask = () => {
    dispatch(deleteTask(id, columnId));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`${classes.task} ${
            snapshot.isDragging ? classes.dragging : null
          }`}
          onDoubleClick={toggleEditMode}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!editMode ? (
            <p>{name}</p>
          ) : (
            <input
              onChange={onTaskChange}
              onBlur={onTaskBlur}
              value={taskText}
              placeholder={taskText}
            />
          )}
          <IconButton aria-label="delete" size="small" onClick={onDeleteTask}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
