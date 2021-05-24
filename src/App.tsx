import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import classes from './App.module.scss';
import InputComponent from './components/input';
import ButtonComponent from './components/button';
import Column from './components/column';
import { columnWithTasksSelector } from './store/selectors';
import { addTask, dropTask } from './store/actions';

const App: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const columnAllIds = useSelector(columnWithTasksSelector);

  const dispatch = useDispatch();

  const onAddTask = () => {
    dispatch(addTask(textInput));
    setTextInput('');
  };

  const onDragEnd = ({ destination, source, draggableId }:DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId
    ) {
      return;
    }
    dispatch(dropTask(destination.droppableId, source.droppableId, draggableId));
  };

  const columnsElements = columnAllIds.map((column) => (
    <Column
      name={column.name}
      key={column.id}
      id={column.id}
      tasks={column.tasks}
    />
  ));
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.app}>
        <div className={classes['add-container']}>
          <InputComponent value={textInput} onChange={onTextChange} />
          <ButtonComponent value="Add Task" onClick={onAddTask} />
        </div>
        <div className={classes['columns-container']}>{columnsElements}</div>
      </div>
    </DragDropContext>
  );
};

export default App;
