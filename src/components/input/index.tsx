import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

const InputComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<string>('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Enter a task"
      variant="outlined"
      size="medium"
      type="text"
      value={textInput}
      onChange={onTextChange}
    />
  );
};

export default InputComponent;
