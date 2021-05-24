import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.scss';
import InputComponent from './components/input';
import ButtonComponent from './components/button';
import Column from './components/column';
import { columnWithTasksSelector } from './store/selectors';
import { addTask } from './store/actions';

const App: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const dispatch = useDispatch();

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const columns = useSelector(columnWithTasksSelector);

  const onAddTask = () => {
    dispatch(addTask(newTaskText));
    setNewTaskText('');
  };

  const columnsElements = columns.map((column) => (
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
        <InputComponent value={newTaskText} onChange={onTextChange} />
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
