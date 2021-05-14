import React from 'react';
import classes from './App.module.scss';
import InputComponent from './components/input';
import ButtonComponent from './components/button';
import Column from './components/column';

// state is here just for showing that all components work
const columns = [
  {
    id: '1',
    name: 'To do',
    tasks: [
      { id: 1, name: 'To make some cofee' },
      { id: 2, name: 'To add sugar' },
    ],
  },
  {
    id: '2',
    name: 'In progress',
    tasks: [
      { id: 3, name: 'To male some noise' },
      { id: 4, name: 'To enjoy' },
    ],
  },
  {
    id: '3',
    name: 'Done',
    tasks: [{ id: 6, name: 'To get up in the morning' }],
  },
];

const App: React.FC = () => {
  const columnsElements = columns.map((column) => (
    <Column name={column.name} key={column.id} tasks={column.tasks} />
  ));

  return (
    <div className={classes.app}>
      <div className={classes['add-container']}>
        <InputComponent
          value="something"
          onChange={(newTaskText) => console.log('you enter', newTaskText)} // To do: replace console.log by function of updating text
        />
        <ButtonComponent
          addTask={() => console.log('you added a task')} // To do: replace console.log by function of adding task
        />
      </div>
      <div className={classes['columns-container']}>{columnsElements}</div>
    </div>
  );
};

export default App;
