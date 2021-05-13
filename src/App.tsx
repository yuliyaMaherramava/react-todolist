import React from "react";
import "./App.scss";
import InputComponent from "./components/input";
import ButtonComponent from "./components/button";
import Column from "./components/column";

function App() {
  let columnsElements = State.columns.allIds.map((column: any) => {
    return (
      <Column
        name={State.columns.byId[column].name}
        key={State.columns.byId[column].id}
        tasksIdFromColumn={State.columns.byId[column].tasks}
        tasks={State.tasks.byId}
      />
    );
  });

  return (
    <div className="app">
      <div className="add-container">
        <InputComponent
          newTaskText={"something"}
          updateNewTaskText={(newTaskText) =>
            console.log("you enter", newTaskText)
          }
        />
        <ButtonComponent
          AddTask={() => console.log("you added a task", State.newTaskText)}
        />
      </div>
      <div className="columns-container">{columnsElements}</div>
    </div>
  );
}

export default App;

//state is here just for showing that all components work
export type TaskType = {
  id: string;
  name: string;
  idColumn: string;
};

type ColumnType = {
  id: string;
  name: string;
  tasks: Array<string>;
};

type StateType = {
  columns: {
    byId: {
      [key: string]: ColumnType;
    };
    allIds: Array<string>;
  };
  tasks: {
    byId: {
      [key: string]: TaskType;
    };
    allIds: Array<string>;
  };
  newTaskText: string;
};

let State: StateType = {
  columns: {
    byId: {
      column1: {
        id: "column1",
        name: "To do",
        tasks: ["task1", "task4"],
      },
      column2: {
        id: "column2",
        name: "In progress",
        tasks: ["task2"],
      },
      column3: {
        id: "column3",
        name: "Done",
        tasks: ["task3"],
      },
    },
    allIds: ["column1", "column2", "column3"],
  },
  tasks: {
    byId: {
      task1: {
        id: "task1",
        name: "To make some noise",
        idColumn: "column1",
      },
      task2: {
        id: "task2",
        name: "To install necessary issues",
        idColumn: "column2",
      },
      task3: {
        id: "task3",
        name: "To start working",
        idColumn: "column3",
      },
      task4: {
        id: "task4",
        name: "To drink tea",
        idColumn: "column1",
      },
    },
    allIds: ["task1", "task2", "task3"],
  },
  newTaskText: "something",
};
