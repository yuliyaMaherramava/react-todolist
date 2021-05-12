import React from "react";
import "./App.css";
import Input from "./components/input";
import Button from "./components/button";

function App() {
  return (
    <div className="app">
      <div className="add-container">
        <Input />
        <Button />
      </div>
    </div>
  );
}

export default App;
