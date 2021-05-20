import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.scss';
import InputComponent from './components/input';
import ButtonComponent from './components/button';
import Column from './components/column';
import { columnWithTasksSelector } from './store/selectors';
import { addTask } from './store/actions';

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

  const columnsElements = columnAllIds.map((column) => (
    <Column
      name={column.name}
      key={column.id}
      id={column.id}
      tasks={column.tasks}
    />
  ));
  return (
    <div className={classes.app}>
      <div className={classes['add-container']}>
        <InputComponent value={textInput} onChange={onTextChange} />
        <ButtonComponent
          value="Add Task"
          onClick={onAddTask}
        />
      </div>
      <div className={classes['columns-container']}>{columnsElements}</div>
    </div>
  );
};

export default App;
