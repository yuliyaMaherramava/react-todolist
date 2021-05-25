import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import classes from './index.module.scss';
import Task from './task';
import { deleteColumn, deleteTask, editColumn } from '../../store/actions';

type PropsType = {
 name: string,
 tasks: Array<TaskType>,
 id: string,
};

const Column: React.FC<PropsType> = ({ name, tasks, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [columnText, setColumnText] = useState<string>(name);
  const dispatch = useDispatch();

  const onColumnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnText(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateColumn = () => {
    dispatch(editColumn(id, columnText));
  };

  const onColumnBlur = () => {
    toggleEditMode();
    updateColumn();
  };

  const onDeleteColumn = () => {
    tasks.forEach((task) => {
      dispatch(deleteTask(task.id, id));
    });
    dispatch(deleteColumn(id));
  };

  const taskElements = tasks.map((task, index) => (
    <Task key={task.id} name={task.name} id={task.id} columnId={task.columnId} index={index} />
  ));

  return (
    <Paper
      elevation={3}
      className={classes.column}
    >
      <div className={classes.header} onDoubleClick={toggleEditMode}>
        {!editMode ? (
          <h3>{name}</h3>
        ) : (
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            onChange={onColumnChange}
            onBlur={onColumnBlur}
            value={columnText}
            placeholder={columnText}
          />
        )}
        <IconButton aria-label="delete" className={classes.margin} onClick={onDeleteColumn}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`${classes['task-container']} ${snapshot.isDraggingOver ? classes.dragging : null}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskElements}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
